import * as React from 'react';
import { ProgressIndicator } from '@fluentui/react/lib/ProgressIndicator';

interface Prop {
    percentage: number
}

export const Progress: React.FunctionComponent<Prop> = ({percentage}:any) => {
//   const [percentComplete, setPercentComplete] = React.useState(0);

  /* React.useEffect(() => {
    const id = setInterval(() => {
      setPercentComplete((intervalIncrement + percentComplete) % 1);
    }, intervalDelay);
    return () => {
      clearInterval(id);
    };
  }); */

  return (
    <ProgressIndicator label="" barHeight={10} description={(percentage*100).toFixed(0)+'%'} percentComplete={percentage} />
  );
};
