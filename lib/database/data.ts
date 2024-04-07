import { connectToDatabase } from "@/lib/mongoose";
import Data from "./models/data.model";
import { revalidatePath } from "next/cache";

export async function getConsumption() {
  await connectToDatabase();

  try {
    const latestData = await Data.findOne().sort({ createdAt: -1 }).exec();
    console.log(latestData);
    return latestData;
    // revalidatePath("/", "layout");
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
          minDate: { $min: "$createdAt" },
          maxDate: { $max: "$createdAt" },
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

    console.log("Valid start date:", validStartDate);
    console.log("Valid end date:", validEndDate);

    const monthlyConsumption = await Data.aggregate([
      {
        $match: {
          createdAt: { $gte: validStartDate, $lt: validEndDate },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          energy: { $sum: "$energy" }, // Assuming 'consumption' is the field to sum
        },
      },
    ]);

    console.log("Arnold:", monthlyConsumption);

    return monthlyConsumption;
  } catch (error) {
    console.error("Error querying monthly consumption:", error);
    throw error;
  }
}
