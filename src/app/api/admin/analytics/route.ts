import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const propertyId = process.env.GA_PROPERTY_ID || '14587478266';
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!clientEmail || !privateKey) {
      return NextResponse.json({
        activeUsers: 0,
        mocked: true,
        message: "Awaiting Google Service Account JSON credentials (CLIENT_EMAIL and PRIVATE_KEY) in .env"
      });
    }

    const analyticsDataClient = new BetaAnalyticsDataClient({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey
      }
    });

    const [response] = await analyticsDataClient.runRealtimeReport({
      property: `properties/${propertyId}`,
      metrics: [
        {
          name: 'activeUsers',
        },
      ],
    });

    let activeUsersCount = 0;
    if (response && response.rows && response.rows.length > 0) {
        activeUsersCount = parseInt(response.rows[0].metricValues?.[0].value || '0', 10);
    }

    return NextResponse.json({
      activeUsers: activeUsersCount,
      status: "connected"
    });

  } catch (error: any) {
    console.error('GA Data API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}