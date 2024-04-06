import { NextResponse } from "next/server";
import { connectToDatabase } from '../../database/db_connect';
import { DataModel } from '../../database/controller';
import { calculatePower } from "@/app/calcs/energy_metter";
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

function getCurrentDateTime(): string {
  const now = new Date();

  // Extract date components
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0'); 
  const year = now.getFullYear();

  // Extract time components
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  // Construct formatted datetime string
  const formattedDateTime = `${day}:${month}:${year}:${hours}h:${minutes}m:${seconds}s`;

  return formattedDateTime;
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const data = await request.json();
    console.log(data);
    const power = calculatePower(data.current, data.voltage);

    if (!data || typeof data.current !== 'number' || typeof data.voltage !== 'number') {
      console.error("Invalid data provided:", data);
      return NextResponse.error();
    }
    else{
      const timenow = getCurrentDateTime();
      const newData = new DataModel({
        timestamp: timenow,
        current: data.current,
        voltage: data.voltage,
        power: power
      });

      await newData.save();
    }
    return NextResponse.json({ time: getCurrentDateTime() ,message: "Data saved successfully", "power": power });

  } catch (error) {
    console.error("Error while processing POST request:", error);
    return NextResponse.error();
  }
}
