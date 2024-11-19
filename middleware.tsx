import { NextRequest, NextResponse, userAgent } from 'next/server';
import { useAppDispatch } from 'redux/hooks';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const data = userAgent(request);

  //   const viewport = device.type === 'mobile' ? 'mobile' : 'desktop';
  //   url.searchParams.set('viewport', viewport);
  //   console.log(data);
  return NextResponse.rewrite(url);
}
