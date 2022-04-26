const generateDataSet = require("./generateDataSet");

const runTestFunctions = async () => {
  const data = await generateDataSet();

  // Filter: Use when you need ALL of the items that meet
  // some criteria
  // Returns: An array of all values that return true when ran
  // through your predicate function
  const highQuantityOrders = data.filter(
    (order) => Number(order.Quantity) >= 50
  );

  // Find: The exact same as filter, but instead of returning ALL items
  // that match your criteria, it returns only the first item
  // Returns: What ever the data type in the array is, in this case object
  const findOrderFromDec12th = data.find((order) =>
    order.InvoiceDate.includes("12/12/2010")
  );

  // Some: Similar to filter, but you would use this when you want
  // to know if anything in the array matches, not necessarily when
  // you need the data that matches, just the information if there is
  // any data
  // Returns: true or false only
  const hasAmericanOrders = data.some(
    (order) => (order.Country = "United States of America")
  );

  // Every: Same as some but rather then finding if only one thing matches
  // your criteria, Every will return true if everything matches or false if
  // anything does not match.
  // Returns: true or false only
  const verifyOrderNumberExists = data.every(
    (order) => order.InvoiceNumber !== "" || order.InvoiceNumber
  );

  // Map: This allows you to alter every single item in an array,
  // in the exact same way then return an array that contains all of the altered
  // items.
  // Returns: An array of the exact same length as your existing array
  const correctedOrders = data.map((order) => ({
    ...order,
    UnitPrice: Number(order.UnitPrice),
    Quantity: Number(order.Quantity),
    InvoiceNo: Number(order.InvoiceNo),
    CustomerID: Number(order.CustomerID),
  }));

  // Reduce: The most complicated array method of all, reduce takes an array
  // and iterates through the array while holding onto an accumulator. This accumulator can
  // be anything, a number, a boolean, an array, or an object. You then alter
  // the accumulator as you loop and end up with one big result at the end
  // a common use for reduce is to reduce the entire array of objects into
  // a value that sums one of the properties
  // NOTE: The second parameter of reduce is the INTIAL VALUE. In this case
  // we use 0 as the first item in the array is an object and will cause issues
  // Returns: One value, of any data type
  const totalRevenue = correctedOrders.reduce((total, currentOrder) => {
    const { Quantity, UnitPrice } = currentOrder;
    currentOrderTotal = Quantity * UnitPrice;

    return Number((total + currentOrderTotal).toFixed(2));
  }, 0);

  // NOTE REDUCE IS NOT JUST FOR RETURNING SUMS!!!
  // here we use a complex reduce where we return a new array with each country
  // seperated into its own object, then inside of that object it has the revenue
  // generated in only that country
  const revenuePerCountry = correctedOrders.reduce(
    (accumulatingArray, order) => {
      const orderTotal = Number((order.Quantity, order.UnitPrice).toFixed(2));

      if (
        accumulatingArray.some((object) => object.Country === order.Country) !==
        true
      ) {
        const countryObject = {
          Country: order.Country,
          Revenue: orderTotal
        };

        return [...accumulatingArray, countryObject];
      } else {
        const currentCountryIndex = accumulatingArray.findIndex((object) => {
          return object.Country === order.Country;
        });
        const currentCountryObject = {...accumulatingArray[currentCountryIndex]};

        const currentCountryRevenue = currentCountryObject.Revenue;
        const newRevenue = Number(
          (currentCountryRevenue + currentOrderTotal).toFixed(2)
        );

        accumulatingArray[currentCountryIndex] = {
          Country: currentCountryObject.Country,
          Revenue: newRevenue
        };
        return accumulatingArray;
      }
    },
    []
  );

  console.log(revenuePerCountry);
};

runTestFunctions();
