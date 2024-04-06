// route.ts

import { NextResponse } from "next/server";
import { connectToDatabase } from '../../database/db_connect';
import { DataModel } from '../../database/controller';
import { queryDailyConsumption, queryMonthlyConsumption } from '../../calculations';

export async function GET(request: Request) {
  try {
    const { pathname } = new URL(request.url, 'http://localhost:3000/api/data'); // Parse request URL

    if (pathname === '/daily') {
      const dailyData = await queryDailyConsumption();
      return NextResponse.json(dailyData);
    }

    if (pathname === '/monthly') {
      const monthlyData = await queryMonthlyConsumption();
      return NextResponse.json(monthlyData);
    }

    return NextResponse.json({ time: new Date(), message: 'Route not found' });
  } catch (error) {
    console.error('Error processing GET request:', error);
    return NextResponse.json({ time: new Date(), message: 'Internal Server Error' });
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
    else {
      const newData = new DataModel({
        timestamp: new Date(),
        current: data.current,
        voltage: data.voltage,
        power: data.power,
        frequency: data.frequency,
        energy: data.energy
      });

      await newData.save();
      return NextResponse.json({ time: new Date(), message: "Data saved successfully"});
    } 
  } catch (error) {
    console.error("Error while processing POST request:", error);
    return NextResponse.error();
  }
}

export default { GET, POST };
