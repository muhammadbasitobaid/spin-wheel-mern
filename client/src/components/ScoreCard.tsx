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
  const { history } = useSelector((state: RootState) => state.wheel);
  return (
    <Card>
      <div className="flex justify-center items-center p-8 mx-4 my-6">
        {history.map(({ label, occurrences }, index) => (
          <div key={uuidv4()} className="flex flex-1">
            <ScoreCell score={occurrences} label={label} />
            {history.length - 1 !== index && (
              <div className="divider divider-horizontal m-0 w-px"></div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ScoreCard;
