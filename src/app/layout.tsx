import type {Metadata} from 'next';
import {headers} from 'next/headers';
import {type PropsWithChildren} from 'react';
import {ReownContextProvider} from '@/libs/reown/context';
import {ThemeProvider} from 'next-themes';
import {GeistSans} from 'geist/font/sans';
import {GeistMono} from 'geist/font/mono';
import './styles.css';

export const metadata: Metadata = {
  title: '0w',
  description: '0wallet'
};

export default async ({children}: PropsWithChildren) => {
  const headersData = await headers();
  const cookies = headersData.get('cookie');
  return (
    <html lang="en" suppressHydrationWarning>
    <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
    <ReownContextProvider cookies={cookies}>
      <ThemeProvider attribute="class">
        {children}
      </ThemeProvider>
    </ReownContextProvider>
    </body>
    </html>
  );
}
