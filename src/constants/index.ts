import {
  ClipboardList,
  Fullscreen,
  LayoutList,
  LocateIcon,
  Mail,
  Phone,
  ShoppingCart,
  Store,
  Activity,
} from "lucide-react";

export const faq = [
  {
    q: `How Do I Reserve Or Book A Car?`,
    a: `On our website, you can directly make a reservation:

    1-Decide which car you want to rent.
    2-Select “Book now.”
    3-Decide on your insurance, the dates you’ll need it, the place to deliver it, and the time to pick it up.
    4-At the bottom of the booking window, click “Book now” to confirm the request for your reservation.
     
    
    You can select “Book on WhatsApp” to speak with a member of our sales staff directly through WhatsApp. They will provide all the information and guide you through the process.
    
    `,
  },
  {
    q: `If I Rent For A Long Period, Do I Get A Discount?`,
    a: `Yes, feel free to contact us via WhatsApp to receive a quote for a long-term rental.
    `,
  },
  {
    q: `What Is The Per Day Allowed Mileage?`,
    a: `The maximum daily mileage is 250km; any 
    further kilometers will be paid separately. While finalizing the booking, you can add more mileage.
    `,
  },
  {
    q: `What Makes A Deposit Necessary?`,
    a: `A deposit is a sum that has been put on hold on the client’s credit card. (Not billed). For 30 days, the deposit is restricted. The block will then be automatically removed after that.

    Any penalties, dings, or damage to the automobile that wasn’t fixed immediately or after the vehicle was returned is charged to the customer. We provide our clients with documentation of the fines and car damage.
     If you want to follow up on deposit complaints, phone or send a WhatsApp message to this number at +Number.
    `,
  },
  {
    q: `Are You Able To Deliver To Abu Dhabi?`,
    a: `Within the Emirate of Dubai, delivery is free. Nevertheless, we ship to other Emirates (500 AED Delivery costs).
    `,
  },
];

export const navLinksArr = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Category",
    path: "/category",
  },
  {
    label: "Brand",
    path: "/brand",
  },
  {
    label: "car",
    path: "/car",
  },
];

export const contactUs = [
  {
    label: "01020227001",
    icon: Phone,
  },
  {
    label: "allam98.ali@gmail.com",
    icon: Mail,
  },
  {
    label: "Qualibaya,Benha",
    icon: LocateIcon,
  },
];

export const adminDashboardLinks = [
  {
    label: "Categories",
    path: `/dashboard/categories`,
    icon: ClipboardList,
  },
  {
    label: "Brands",
    path: `/dashboard/brands`,
    icon: LayoutList,
  },
  {
    label: "Cars",
    path: `/dashboard/cars`,
    icon: Store,
  },
  {
    label: "Orders",
    path: `/dashboard/orders`,
    icon: ShoppingCart,
  },
  {
    label: "Activity",
    path: `/dashboard/activities`,
    icon: Activity,
  },
];
