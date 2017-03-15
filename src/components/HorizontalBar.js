import React from 'react';

const HorizontalBar = (props) => {
    const { total, partial } = props;

    const calculatePercentageFilled = () => {
        if(partial >= total){
            return 100;
        }
        return ((partial / total) * 100);
   }

   const calculateColor = () => {
      if(total && partial){
          if(partial >= total){
              return '#ff0000';
          }
          return 'green';
      }
      return 'transparent';
   }

   const roundMinutesToFixed = (minutes) => {
       return (minutes / 60).toFixed(2);
   }

    return (
        <svg height="30" width="100%">
            <rect width="100%" height="30" fill="#ddd"></rect>
            <rect width={ calculatePercentageFilled() + '%' } height="30" fill={ calculateColor() }></rect>
            <text x="50%" y="15" dominantBaseline="middle" textAnchor="middle" width="100%">{ roundMinutesToFixed(partial) } / { roundMinutesToFixed(total) } hrs.</text>
        </svg>

    );
}

export default HorizontalBar;
