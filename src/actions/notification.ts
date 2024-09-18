"use server";

import prisma from "@/libs/prisma/client";
import { Notification } from "@/types/zod";
import { getAuthUser } from "./auth";

export async function getNotifications(): Promise<Array<Notification>> {
  const auth = await getAuthUser();

  const notifications = await prisma.notification.findMany({
    where: {
      userId: auth.id,
    },
  });

  return notifications;
}

export async function readNotifications(notifications: Array<Notification>) {
  await prisma.notification.updateMany({
    where: {
      id: {
        in: notifications.map((notification) => notification.id),
      },
    },
    data: {
      read: true,
    },
  });
}

export async function getUnreadNotificationCount(): Promise<number> {
  const auth = await getAuthUser();

  return await prisma.notification.count({
    where: {
      userId: auth.id,
      read: false,
    },
  });
}
