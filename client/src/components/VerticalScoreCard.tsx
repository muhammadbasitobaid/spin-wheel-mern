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
  <div className="flex flex-col items-center font-semibold mx-2">
    <span className="text-blue text-8xl">{score}</span>
    <span className="text-gray text-4xl">{label}</span>
  </div>
);

const VerticalScoreCard: FC = () => {
  const { wheelSnapshot, wheelList: options } = useSelector(
    (state: RootState) => state.wheel
  );

  const { history } = wheelSnapshot;

  const countOccurrences = (arr?: string[]) => {
    const counts: { [key: string]: number } = {};

    // Initialize counts with 0 for each option label
    options?.forEach((option: string) => {
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
      <div className="flex flex-col h-full justify-center items-end p-8">
        {Object.entries(occurrences).map(([label, score], index) => (
          <div key={uuidv4()} className="w-auto h-full">
            <ScoreCell score={score} label={label} />
            {Object.entries(occurrences).length - 1 !== index && (
              <div className="divider divider-vertical h-px m-0"></div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default VerticalScoreCard;
