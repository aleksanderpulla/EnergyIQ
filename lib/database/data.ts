import { connectToDatabase } from "@/lib/mongoose";
import Data from "./models/data.model";

export async function getConsumption() {
  try {
    await connectToDatabase();
    const latestData = await Data.findOne().sort({ createdAt: -1 }).exec();
    return latestData;
  } catch (error) {
    console.error("Error reading latest data:", error);
    return null;
  }
}
export async function queryYearlyConsumption() {
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

    const monthlyConsumption = await Data.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%m", date: "$createdAt" } },
          energy: { $sum: "$energy" },
        },
      },
      {
        $addFields: {
          monthName: {
            $let: {
              vars: {
                monthsInString: [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ],
                monthIndex: { $subtract: [{ $toInt: "$_id" }, 1] },
              },
              in: { $arrayElemAt: ["$$monthsInString", "$$monthIndex"] },
            },
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    return monthlyConsumption;
  } catch (error) {
    console.error("Error querying yearly consumption:", error);
    throw error;
  }
}
