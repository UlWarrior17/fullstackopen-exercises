import { useState } from "react";

const Header = ({ heading }) => {
  return <h1>{heading}</h1>;
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};


const Statistic = ({ good, neutral, bad }) => {
  let sum = good + neutral + bad;
  let avg = (good - bad) / sum;
  let positive = (good / sum) * 100;

  if (good === 0 && neutral === 0 && bad === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <div>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={sum} />
      <StatisticLine text="average" value={avg} />
      <StatisticLine text="positive" value={positive + "%"} />
    </div>
  );
};
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    const updatedGood = good + 1;
    setGood(updatedGood);
  };

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
  };

  const handleBadClick = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);
  };

  return (
    <div>
      <Header heading="give feedback" />
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
      <Header heading="statistics" />
      <Statistic good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
