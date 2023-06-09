import React from "react";
import { TrashIcon } from "@heroicons/react/24/solid";

export type TSubscriptionItemProps = {
  description: string;
  subscriptionDate: string;
  expirationDate?: string;
};

export function SubscriptionItem({ description, subscriptionDate, expirationDate }: TSubscriptionItemProps) {
  return (
    <div className="flex flex-row  justify-between  py-5 px-6 my-4 pb-5 bg-[#00022C]">
      <div className=" flex flex-col w-10/12">
        <div className="py-4">
          <h1 className="text-2xl font-semibold tracking-[.04em] leading-4">{description} </h1>
        </div>
        <div className="space-x-32  py-2">
          <span
            className="
           font-light text-lg"
          >
            Subscription date: {subscriptionDate}
          </span>
          <span className="text-lg">
            Expiration date: {expirationDate ? expirationDate : "........................"}
          </span>
        </div>
      </div>
      <div className="flex justify-center w-2/12 items-end">
        <button
          className="btn btn-primary rounded w-full capitalize text-lg font-medium bg-[#00022C] text-[#DC4A4A]"
          type="button"
        >
          <TrashIcon className="h-8 w-4 ml-2 mr-4 sm:ml-0" />
          Delete
        </button>
      </div>
    </div>
  );
}

export function SubscriptionItemEmptyState() {
  return (
    <div className="flex justify-center  pt-14 pb-5  ">
      <h1 className="text-3xl font-light"> - You have no active subscriptions - </h1>
    </div>
  );
}

export function SubscriptionItemLoadingState() {
  return (
    <div className="flex flex-row  justify-between  pt-14 pb-5  border-b-4 bg-[#00022C]">
      <div className=" flex flex-col w-10/12">
        <div className="py-4 bg-gray-400 animate-pulse w-3/4  h-10" />
        <div className=" flex space-x-32  pt-4 mr-4">
          <div className="bg-gray-400 animate-pulse w-1/2  h-7" />
          <div className="bg-gray-400 animate-pulse w-1/2  h-7" />
        </div>
      </div>
      <div className="flex justify-center w-2/12 items-end">
        <div className=" w-full rounded bg-gray-400 animate-pulse  h-14" />
      </div>
    </div>
  );
}
