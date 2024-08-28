import React, { useState, useEffect } from 'react';
import { TemplatePage } from "templates/TemplatePage";
import s from "./FinalsTreePage.module.scss";
import { sendRequestGET } from 'requests';
import { Link, useParams } from 'react-router-dom';
import {SwordLinkButton} from "../../components/SwordLinkButton";
import {SwordLinkButtonAlt} from "../../components/SwordLinkButtonAlt";
import {PATHS} from "../../config/paths";

// FightNode component to render each fight node
const FightNode = ({ fightNode }) => {
  if (!fightNode) {
    console.log("No fight node available");
    return null;
  }

  const fight = fightNode.fight;

  // Safely handle null participants
  const firstParticipant = fight?.firstParticipant?.fullName || "Oczekujący";
  const secondParticipant = fight?.secondParticipant?.fullName || "Oczekujący";

  console.log(`Rendering fight: ${firstParticipant} vs ${secondParticipant}`);

  return (
    <div style={{ margin: "20px", textAlign: "center" }}>
      <div>
        <Link to={`/fight/${fight.id}`}>
          <strong>{firstParticipant}</strong> vs <strong>{secondParticipant}</strong>
        </Link>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
        {/* Recursively render child fights */}
        <div>{fightNode.firstChildNode && <FightNode fightNode={fightNode.firstChildNode} />}</div>
        <div>{fightNode.secondChildNode && <FightNode fightNode={fightNode.secondChildNode} />}</div>
      </div>
    </div>
  );
};

// TournamentTree component to render the entire tournament tree
const FinalsTree = ({ data }) => {
  if (!data) {
    console.log("No data available");
    return <div>No data to display</div>;
  }

  const [ finals, thirdPlace ] = data;

  console.log("Finals data:", finals);
  console.log("Third place data:", thirdPlace);

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      {/* Third Place Fight on the left */}
      <div style={{ marginRight: "100px", textAlign: "center" }}>
        <h3>Walka o trzecie miejsce</h3>
        <FightNode fightNode={thirdPlace} />
      </div>

      {/* Finals Fight in the center */}
      <div style={{ textAlign: "center" }}>
        <h3>Finały</h3>
        <FightNode fightNode={finals} />
      </div>
    </div>
  );
};

// FinalsTreePage component to fetch and display the finals tree
export const FinalsTreePage = () => {
  const [finals, setFinals] = useState(null);

  // Retrieve the dynamic number from the URL
  const { number } = useParams();

  useEffect(() => {
    // Fetch data for finals and third place fights
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
        {/* Render the TournamentTree if data is available */}
        {finals ? <FinalsTree data={finals} /> : <p>Loading...</p>}
      </div>
    </TemplatePage>
  );
};