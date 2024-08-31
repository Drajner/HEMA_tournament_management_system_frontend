import React, { useState, useEffect } from 'react';
import { TemplatePage } from "templates/TemplatePage";
import s from "./FinalsTreePage.module.scss";
import { sendRequestGET } from 'requests';
import { Link, useParams } from 'react-router-dom';
import { SwordLinkButton } from 'components/SwordLinkButton';
import { SwordLinkButtonAlt } from 'components/SwordLinkButtonAlt';
import {PATHS} from "../../config/paths";


const FightNode = ({ fightNode }) => {
  if (!fightNode) return null;

  const fight = fightNode.fight;
  const firstParticipant = fight?.firstParticipant?.fullName || "Oczekujący";
  const secondParticipant = fight?.secondParticipant?.fullName || "Oczekujący";

  return (
    <div className={s.fightNode}>
      <div>
        {/* <Link to={`/fight/${fight.id}`}>
          <strong>{firstParticipant}</strong> vs <strong>{secondParticipant}</strong>
        </Link> */}
        <div className={s.addButtonContainer}>
          <SwordLinkButtonAlt href={`${PATHS.fight.replace(':number', fight.id)}`} variant='small'>
          <strong>{firstParticipant}</strong> vs <strong>{secondParticipant}</strong>
          </SwordLinkButtonAlt>
        </div>
      </div>
      <div className={s.childNodes}>
        {fightNode.firstChildNode && <FightNode fightNode={fightNode.firstChildNode} />}
        {fightNode.secondChildNode && <FightNode fightNode={fightNode.secondChildNode} />}
      </div>
    </div>
  );
};

const FinalsTree = ({ data }) => {
  if (!data) return <div>Brak dostępnych finałów</div>;

  const [finals, thirdPlace] = data;
  const firstFinalsParticipant = finals?.firstParticipant?.fullName || "Oczekujący";
  const secondFinalsParticipant = finals?.secondParticipant?.fullName || "Oczekujący";
  const firstThirdPlaceParticipant = thirdPlace?.firstParticipant?.fullName || "Oczekujący";
  const secondThirdPlaceParticipant = thirdPlace?.secondParticipant?.fullName || "Oczekujący";

  return (
    <div className={s.finalsTreeContainer}>
      
      <div className={s.finalsStyle}>
          <h3>Finały</h3>
          <div className={s.fightNode}>
            {/* <Link to={`/fight/${finals.fight.id}`}>
            <strong>{firstFinalsParticipant}</strong> vs <strong>{secondFinalsParticipant}</strong>
            </Link> */}
            <div className={s.addButtonContainer}>
              <SwordLinkButton href={`${PATHS.fight.replace(':number', finals.fight.id)}`}>
              <strong>{firstFinalsParticipant}</strong> vs <strong>{secondFinalsParticipant}</strong>
              </SwordLinkButton>
            </div>
          </div>
      </div>
      <h1><br></br></h1>
      <div className={s.thirdPlaceStyle}>
          <h3>Walka o trzecie miejsce</h3>
          <div className={s.fightNode}>
            {/* <Link to={`/fight/${thirdPlace.fight.id}`}>
            <strong>{firstThirdPlaceParticipant}</strong> vs <strong>{secondThirdPlaceParticipant}</strong>
            </Link> */}
            <div className={s.addButtonContainer}>
              <SwordLinkButton href={`${PATHS.fight.replace(':number', thirdPlace.fight.id)}`}>
              <strong>{firstThirdPlaceParticipant}</strong> vs <strong>{secondThirdPlaceParticipant}</strong>
              </SwordLinkButton>
            </div>
          </div>
      </div>
      <h1><br></br></h1>
      <div className={s.bottomRow}>
          <FightNode fightNode={finals.firstChildNode} />
          <FightNode fightNode={finals.secondChildNode} />
      </div>
    </div>
  );
};

export const FinalsTreePage = () => {
  const [finals, setFinals] = useState(null);
  const { number } = useParams();

  useEffect(() => {
    sendRequestGET(`tournaments/getFinals/${number}`)
      .then(async response => {
        const finalsData = await response.json();
        console.log("Fetched finals data:", finalsData);
        setFinals(finalsData);
      })
      .catch(err => console.error("Error fetching finals:", err));
  }, [number]);

  return (
    <TemplatePage>
      <div className={s.fullDiv}>
        <h1 className={s.headerUp}>Drabinka finałowa</h1>
        <h1><br></br></h1>
        <h1><br></br></h1>
        {finals ? <FinalsTree data={finals} /> : <p>Loading...</p>}
      </div>
    </TemplatePage>
  );
};