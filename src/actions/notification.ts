"use server";

import prisma from "@/libs/prisma/client";
import { Notification, User } from "@/models/zod";

export async function getNotifications(
  user: User,
): Promise<Array<Notification>> {
  const notifications = await prisma.notification.findMany({
    where: {
      user: user,
    },
  });

  return notifications;
}
