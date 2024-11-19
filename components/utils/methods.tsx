export    const percentageCalculator = (offerPrice: number, originalPrice: number) => {
    const price = (offerPrice / originalPrice) * 100 - 100;
    return Math.round(price);
  };