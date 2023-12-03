import { Box, Step, StepLabel, Stepper, colors, Stack, Button } from "@mui/material"
import { Description, QuestionText } from ".."
import { useFormContext } from "../../contexts/formcontext"
import competencias from '../../data/competencias.json'
import blooms from '../../data/blooms.json'
import { useEffect, useState } from "react"
import { useRouter } from 'next/router';

import Check from '@mui/icons-material/Check';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';
import SceneInit from "../../libs/SceneInit"
// import * as THREE from 'three'

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#52FDDE',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#52FDDE',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled('div')(
  ({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...(ownerState.active && {
      color: '#52FDDE',
    }),
    '& .QontoStepIcon-completedIcon': {
      color: '#52FDDE',
      zIndex: 1,
      fontSize: 18,
    },
    '& .QontoStepIcon-circle': {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    }
  }),
);

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

const Questions = () => {
  const { formData, setFormData } = useFormContext();
  const rotas = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentIndex, setCurrentIndex] = useState([0,0]);
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [scene, setScene] = useState(null)
  const bloomMatrix = blooms['matrix'];

  useEffect(() => {
    let dimentions = [window.innerWidth, 360]
    const Scene3d = new SceneInit('myThreeJsCanvas', 'canvasContainer', dimentions, setCurrentIndex, setSelectedIndex);
    Scene3d.initialize();
    Scene3d.animate();
    Scene3d.createMesh();
    setScene(Scene3d);
    // document.body.appendChild(stats.dom);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <QuestionText>{competencias["lista"][currentQuestion]}</QuestionText>
      <Box
        sx={{
          height: "20rem",
          width: "100%",
          borderRadius: "1rem",
          display:'flex',
          flexDirection: 'column',
          alignItems:'center'
        }}
      >
        {/* Aqui vai o diagrama da Taxonomia de Bloom */}
        <Description id="description" className='disabled'>
          {bloomMatrix[currentIndex[0]][currentIndex[1]]['title']}
          <p>{bloomMatrix[currentIndex[0]][currentIndex[1]]['description']}</p>
        </Description>
        <div id="canvasContainer" style={{overflow: 'unset'}}>
          <canvas id="myThreeJsCanvas"/>
        </div>
      </Box>
      {/* Container com os botões e 'steps' */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: '1rem'
        }}
      >
        {/* Container com os botões */}
        <Box sx={{
          display: "flex",
          flexDirection: "row",
          gap: '1rem',
          mt: "1rem"
        }}>
          <Button
            disabled={currentQuestion == 0}
            sx={{
              padding: '.5rem 2rem',
              borderRadius: '.5rem',
              minWidth: '8rem',
              color: "#FFF",
              backgroundColor: "#7A5DAB",
              ":hover": {
                backgroundColor: "#52FDDE",
                color: "#7A5DAB"
              }
            }}
            onClick={() => {
              setCurrentQuestion(currentQuestion > 0 ? currentQuestion - 1 : currentQuestion);
              let competences = formData.competences;
              // console.log(competences[currentQuestion-1]);
              scene.set_selected_item(competences[currentQuestion-1]);
              setSelectedIndex(competences[currentQuestion-1]);
            }}
          >
            Anterior
          </Button>
          <Button
          disabled={selectedIndex == null}
            sx={{
              padding: '.5rem 2rem',
              borderRadius: '.5rem',
              minWidth: '8rem',
              color: "#FFF",
              backgroundColor: "#7A5DAB",
              ":hover": {
                backgroundColor: "#52FDDE",
                color: "#7A5DAB"
              }
            }}
            onClick={() => {
              let competences = formData.competences ? formData.competences : {};
              competences[currentQuestion] = selectedIndex;
              setFormData({...formData, competences: competences});
              if (currentQuestion + 1 < competencias["lista"].length){
                setCurrentQuestion(currentQuestion + 1);
                if(!competences[currentQuestion + 1]){
                  setSelectedIndex(null)
                  scene.clear_selection()
                } else {
                  scene.set_selected_item(competences[currentQuestion+1]);
                  setSelectedIndex(competences[currentQuestion+1]);
                }
              } else {
                console.log({...formData, competences: competences});
                rotas.push('/obrigado')
              }
            }}
          >
            {currentQuestion + 1 < competencias["lista"].length ? 'Próximo' : 'Enviar'}
          </Button>
        </Box>
        {/* Stepper */}
        <Stepper activeStep={currentQuestion} alternativeLabel connector={<QontoConnector />}>
          {competencias["lista"].map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={QontoStepIcon}></StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Box>

  )
}

export default Questions;