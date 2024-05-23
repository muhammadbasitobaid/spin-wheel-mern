import { FC } from "react";
import Card from "./common/Card";

interface ScoreCellProps {
  score: number;
  label: string;
}

const ScoreCell: FC<ScoreCellProps> = ({ score, label }) => (
  <div className="flex flex-col items-center font-semibold w-20">
    <span className="text-blue text-5xl">{score}</span>
    <span className="text-gray text-2xl">{label}</span>
  </div>
);

const ScoreCard: FC = () => {
  return (
    <Card>
      <div className="flex justify-center items-center p-16 mx-4 my-6">
        <ScoreCell score={0} label="Yes" />
        <div className="divider divider-horizontal mx-score-divider-custom--sm"></div>
        <ScoreCell score={0} label="No" />
      </div>
    </Card>
  );
};

export default ScoreCard;
