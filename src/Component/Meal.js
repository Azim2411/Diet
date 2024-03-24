import React from 'react';

const MealPlan = ({ data }) => {
  // Function to get the number of days in a month
  const getDaysInMonth = (year, month) => {
    const lastDayOfMonth = new Date(year, month, 0).getDate();
    return lastDayOfMonth;
  };

  // Function to format date into the desired format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
    return `${year}-${month}-${day},${dayName}`;
  };

  // Group the data by month
  const groupedData = Object.entries(data).reduce((acc, [date, meals]) => {
    const [year, month] = date.split(',')[0].split('-');
    const formattedMonth = `${year}-${month}`;
    if (!acc[formattedMonth]) {
      acc[formattedMonth] = {};
    }
    acc[formattedMonth][date] = meals;
    return acc;
  }, {});

  // Array of month names
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Render the calendar grid
  return (
    <div className="meal-plan-container">
      {Object.entries(groupedData).map(([month, monthData]) => {
        console.log("group",groupedData)
        const [year, monthNumber] = month.split('-');
        const daysInMonth = getDaysInMonth(year, monthNumber);
        const firstDayOfMonth = new Date(year, monthNumber - 1, 1).getDay(); // Day of the week (0-6)
        
        // Create an array of days in the month
        const daysArray = [...Array(daysInMonth).keys()].map(day => day + 1);

        // Pad the beginning of the array with empty cells to align the first day of the month
        const paddedDaysArray = [...Array(firstDayOfMonth).fill(null), ...daysArray];

        return (
          <div key={month} className="month-section">
            <h2>{monthNames[parseInt(monthNumber) - 1]} {year}</h2>
            <div className="calendar-grid">
              {paddedDaysArray.map((day, index) => {
                const date = day ? new Date(year, monthNumber - 1, day) : null;
                const dateString = date ? formatDate(date.toLocaleDateString()) : null;
                const meals = dateString && monthData[dateString]; // Get meals for the current date
                const dayOfWeek = index % 7; // Calculate the day of the week (0-6)
                
                return (
                  <div key={index} className={`calendar-day ${dayOfWeek === 0 ? 'sunday' : ''}`}>
                    {dateString && (
                      <>
                        <h3>{dateString.split(",")[0].split("-")[2] + "," + dateString.split(",")[1]}</h3>
                        <ul>
                          {meals ? (
                            Object.entries(meals).map(([mealType, meal], mealIndex) => (
                              <li key={mealIndex}>
                                <strong>{mealType}:</strong> <br /> <span>Carbs:</span> {meal.carbs.name}, <span>Amount:</span> {meal.carbs.carbs}gm<br /> <span>Protein:</span> {meal.protein.name} ,<span>Amount:</span> {meal.protein.protein}gm {/* Corrected typos in property names */}
                              </li>
                            ))
                          ) : (
                            <li>No meals available</li>
                          )}
                        </ul>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MealPlan;
