import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import Data from "@/lib/database/models/data.model";

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const data = await request.json();

    if (!data) {
      console.error("No data provided");
      return NextResponse.error();
    }
    if (
      typeof data.current !== "number" ||
      typeof data.voltage !== "number" ||
      typeof data.power !== "number" ||
      typeof data.frequency !== "number" ||
      typeof data.energy !== "number"
    ) {
      console.error("Invalid data provided:", data);
      return NextResponse.error();
    } else {
      const newData = new Data({
        createdAt: new Date(),
        current: data.current,
        voltage: data.voltage,
        power: data.power,
        frequency: data.frequency,
        energy: data.energy,
      });

      await newData.save();
      return NextResponse.json({
        time: new Date().toLocaleString("en-US", { timeZone: "Europe/Paris" }),
        message: "Data saved successfully",
      });
    }
  } catch (error) {
    console.error("Error while processing POST request:", error);
    return NextResponse.error();
  }
}
