import React from "react";
import { Stack } from "expo-router";

export default function RootLayout() {
  console.log("inside layout.tsx");
  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  );
}