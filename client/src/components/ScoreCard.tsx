import { FC } from "react";
import Card from "./common/Card";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { RootState } from "src/store/store";

interface ScoreCellProps {
  score: number;
  label: string;
}

const ScoreCell: FC<ScoreCellProps> = ({ score, label }) => (
  <div className="flex-1 flex flex-col items-center font-semibold mx">
    <span className="text-blue text-5xl">{score}</span>
    <span className="text-gray text-2xl">{label}</span>
  </div>
);

const ScoreCard = () => {
  const { history, selectedWheel } = useSelector(
    (state: RootState) => state.wheel
  );
  const { options } = selectedWheel;

  const countOccurrences = (arr?: string[]) => {
    const counts: { [key: string]: number } = {};

    // Initialize counts with 0 for each option label
    options.forEach((option: string) => {
      counts[option] = 0;
    });

    // Update counts based on the history array
    if (arr && arr.length > 0) {
      arr.forEach((item) => {
        counts[item] = (counts[item] || 0) + 1;
      });
    }

    return counts;
  };

  const occurrences = countOccurrences(history);

  return (
    <Card>
      <div className="flex justify-center items-center p-8 mx-4 my-6">
        {Object.entries(occurrences).map(([label, score], index) => (
          <div key={uuidv4()} className="flex flex-1">
            <ScoreCell score={score} label={label} />
            {Object.entries(occurrences).length - 1 !== index && (
              <div className="divider divider-horizontal m-0 w-px"></div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ScoreCard;
