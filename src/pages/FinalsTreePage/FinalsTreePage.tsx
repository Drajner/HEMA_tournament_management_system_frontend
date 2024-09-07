import React, { useState, useEffect } from 'react';
import { TemplatePage } from "templates/TemplatePage";
import s from "./FinalsTreePage.module.scss";
import { sendRequestGET, sendUnauthRequestGET } from 'requests';
import { Link, useParams } from 'react-router-dom';
import { SwordLinkButton } from 'components/SwordLinkButton';
import { SwordLinkButtonAlt } from 'components/SwordLinkButtonAlt';
import {PATHS} from "../../config/paths";

interface Participant {
  fullName: string;
}

interface Fight {
  id: string;
  firstParticipant?: Participant;
  secondParticipant?: Participant;
}

interface FightNodeType {
  fight: Fight;
  firstChildNode?: FightNodeType;
  secondChildNode?: FightNodeType;
}

interface FinalsData {
  fight: Fight;
  firstParticipant?: Participant;
  secondParticipant?: Participant;
}

interface FightNodeProps {
  fightNode: FightNodeType | undefined;
  level?: number;
}


const FightNode: React.FC<FightNodeProps> = ({ fightNode, level = 1 }) => {
  if (!fightNode) return null;

  const fight = fightNode.fight;
  const firstParticipant = fight?.firstParticipant?.fullName || "Oczekujący";
  const secondParticipant = fight?.secondParticipant?.fullName || "Oczekujący";

  return (
    <div className={s.fightNode} style={{ marginLeft: `${level * 300}px` }}>
      <div className={s.childNodes}>
        {fightNode.firstChildNode && <FightNode fightNode={fightNode.firstChildNode} level={level + 1} />}
      </div>
      <div className={s.addButtonContainer}>
        <SwordLinkButtonAlt href={`${PATHS.fight.replace(':number', fight.id)}`} variant='small'>
          <strong>{firstParticipant}</strong> vs <strong>{secondParticipant}</strong>
        </SwordLinkButtonAlt>
      </div>
      <div className={s.childNodes}>
        {fightNode.secondChildNode && <FightNode fightNode={fightNode.secondChildNode} level={level + 1} />}
      </div>
    </div>
  );
};

interface FinalsTreeProps {
  data: [FightNodeType, FightNodeType];
}

const FinalsTree: React.FC<FinalsTreeProps> = ({ data }) => {
  if (!data) return <div>Brak dostępnych finałów</div>;

  const [finals, thirdPlace] = data;
  const firstFinalsParticipant = finals?.fight.firstParticipant?.fullName || "Oczekujący";
  const secondFinalsParticipant = finals?.fight.secondParticipant?.fullName || "Oczekujący";
  const firstThirdPlaceParticipant = thirdPlace?.fight.firstParticipant?.fullName || "Oczekujący";
  const secondThirdPlaceParticipant = thirdPlace?.fight.secondParticipant?.fullName || "Oczekujący";

  return (
    <div style={{ overflowX: 'auto', width: '100%' }}>
      <div className={s.finalsTreeContainer}>
        <div className={s.horizontalTreeContainer}>
          <FightNode fightNode={finals.firstChildNode} />
        </div>
        <div className={s.finalsStyle}>
          <h3>Finały</h3>
          <div className={s.fightNode}>
            <div className={s.addButtonContainer}>
              <SwordLinkButton href={`${PATHS.fight.replace(':number', finals.fight.id)}`}>
                <strong>{firstFinalsParticipant}</strong> vs <strong>{secondFinalsParticipant}</strong>
              </SwordLinkButton>
            </div>
          </div>
        </div>
        <div className={s.thirdPlaceStyle}>
          <h3>Walka o trzecie miejsce</h3>
          <div className={s.fightNode}>
            <div className={s.addButtonContainer}>
              <SwordLinkButton href={`${PATHS.fight.replace(':number', thirdPlace.fight.id)}`}>
                <strong>{firstThirdPlaceParticipant}</strong> vs <strong>{secondThirdPlaceParticipant}</strong>
              </SwordLinkButton>
            </div>
          </div>
          <h1><br></br></h1>
        </div>
        <div className={s.horizontalTreeContainer}>
          <FightNode fightNode={finals.secondChildNode} />
        </div>
      </div>
    </div>
  );
};

export const FinalsTreePage = () => {
  const [finals, setFinals] = useState<[FinalsData, FinalsData] | null>(null);
  const { number } = useParams();

  useEffect(() => {
    sendUnauthRequestGET(`tournaments/getFinals/${number}`)
      .then(async response => {
        const finalsData = await response.json();
        setFinals(finalsData);
      })
      .catch(err => console.error("Error fetching finals:", err));
  }, [number]);

  return (
    <TemplatePage>
      <div className={s.fullDiv}>
        <h1 className={s.headerUp}>
          {finals?.[0] ? <p>Drabinka finałowa</p> : <p>Brak drabinki finałowej</p>}
        </h1>
        <h1><br></br></h1>
        <h1><br></br></h1>
        {finals?.[0] ? <FinalsTree data={finals} /> : <p></p>}
      </div>
    </TemplatePage>
  );
};