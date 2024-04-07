import { connectToDatabase } from "@/lib/mongoose";
import Data from "./models/data.model";
import { revalidatePath } from "next/cache";

export async function getConsumption() {
  await connectToDatabase();

  try {
    const latestData = await Data.findOne().sort({ createdAt: -1 }).exec();
    console.log(latestData);
    return latestData;
    revalidatePath("/");
  } catch (error) {
    console.error("Error reading latest data:", error);
    return null;
  }
}
export async function queryMonthlyConsumption() {
  try {
    await connectToDatabase();

    // Find the minimum and maximum dates in the database
    const minMaxDates = await Data.aggregate([
      {
        $group: {
          _id: null,
          minDate: { $min: "$timestamp" },
          maxDate: { $max: "$timestamp" },
        },
      },
    ]);

    if (minMaxDates.length === 0) {
      throw new Error("No data found in the database");
    }

    const { minDate, maxDate } = minMaxDates[0];

    // Calculate start date (first day of the current month) and end date (tomorrow)
    const startDate = new Date();
    startDate.setDate(1);
    startDate.setHours(0, 0, 0, 0); // Set time to beginning of the day
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1); // Increment end date by 1 day (to get data for the current day)

    // Ensure start date and end date are within the range of available data
    const validStartDate = minDate < startDate ? startDate : minDate;
    const validEndDate = maxDate > endDate ? endDate : maxDate;

    const monthlyConsumption = await Data.aggregate([
      {
        $match: {
          timestmp: { $gte: validStartDate, $lt: validEndDate },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$timestamp" } },
          consumption: { $sum: "$energy" }, // Assuming 'consumption' is the field to sum
        },
      },
    ]);

    return monthlyConsumption;
  } catch (error) {
    console.error("Error querying monthly consumption:", error);
    throw error;
  }
}
