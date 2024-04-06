import { NextResponse } from "next/server";
import { connectToDatabase } from '../../database/db_connect';
import { DataModel } from '../../database/controller';
import { time } from "console";

export async function GET(request: Request) {
  try {
    // You can optionally connect to the database here if needed for GET requests
    
    // Return a JSON response
    return NextResponse.json({ message: "Hello World" });
  } catch (error) {
    console.error("Error while processing GET request:", error);
    
    // Return an error response
    return NextResponse.error();
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const data = await request.json();
    console.log(data);

    if (!data || typeof data.current !== 'number' || typeof data.voltage !== 'number') {
      console.error("Invalid data provided:", data);
      return NextResponse.error();
    }
    else{
      const newData = new DataModel({
        timestamp: Date,
        current: data.current,
        voltage: data.voltage,
        power: data.power,
        frequency: data.frequency,
        energy: data.energy
      });

      await newData.save();
    }
    return NextResponse.json({ time: new Date,message: "Data saved successfully"});

  } catch (error) {
    console.error("Error while processing POST request:", error);
    return NextResponse.error();
  }
}
