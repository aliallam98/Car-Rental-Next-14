import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from 'query-string'
import { UrlQueryParams } from "@/typings";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions
  );

  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};


export const handleError = (error: unknown) => {
  console.error(error)
  throw new Error(JSON.stringify(error))
}

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params)
  currentUrl[key] = value
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  )
}

export const ApiFeatures = (reqQuery:any)=>{
  
  let {query,sort,order,page,limit,fields,...filters} = reqQuery
  let conditions :any = {}
      // Search
      if(query && query !== '' ){
          conditions.$or = [
              { name: { $regex: query , $options:"i" } },
              { description: { $regex: query , $options:"i" } }
            ]
      }
      // Filter
      if(filters){
          let queryFiltersCopy = {...filters}
          queryFiltersCopy = JSON.parse(JSON.stringify(queryFiltersCopy).replace(/(gt|gte|lt|lte)/g, (match) => `$${match}`))
          conditions = {...conditions , ...queryFiltersCopy}
      }

       sort = reqQuery.sort || 'createdAt';
       order = reqQuery.order || 'desc';


  
      // Pagination
      //  page = parseInt(page)
      if (page <= 0 || !page) page = 1;   
  
      // limit = parseInt(limit)
      if (limit <= 0 || !limit) limit = 6;
      const skip = (page - 1) * limit

      return {
        conditions,
          page,
          skip,
          limit,
          sort,
          order,
          fields
      }
  
}