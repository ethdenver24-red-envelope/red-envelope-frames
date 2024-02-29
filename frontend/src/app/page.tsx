"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Connect } from "@/components/fhevm/connect";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
  const [token, setToken] = useState<number>();
  const [amount, setAmount] = useState<number>();
  const [numRecipients, setNumRecipients] = useState<number>();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Card>
        <CardHeader>
          <CardTitle>Create Red Envelope</CardTitle>
          <CardDescription>
            Create a new envelope to send to your friends.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Label htmlFor="token">Token</Label>
          <Input type="text" id="token" placeholder="0x1234...5678" />
        </CardContent>
        <CardContent>
          <Label htmlFor="amount">Amount</Label>
          <Input type="number" id="amount" placeholder="" />
        </CardContent>
        <CardContent>
          <Label htmlFor="numRecipients">Number of Recipients</Label>
          <Input type="number" id="numRecipients" placeholder="" />
        </CardContent>
        <CardFooter className="w-full flex items-center">
          <Connect />
        </CardFooter>
      </Card>
    </main>
  );
}
