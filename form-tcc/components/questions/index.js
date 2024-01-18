import { Box, Step, StepLabel, Stepper, colors, Stack, Button, useMediaQuery, Checkbox, FormControlLabel } from "@mui/material";
import { Description, QuestionText } from "..";
import { useFormContext } from "../../contexts/formcontext";
import CompetencesApi from '../../libs/CompetencesAPI';
import competencias from '../../data/competencias.json';
import blooms from '../../data/blooms.json';
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';

import Check from '@mui/icons-material/Check';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';
import SceneInit from "../../libs/SceneInit";
import MatrixItem from "../matrixItem";
import { pink } from "@mui/material/colors";
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

function clearSelection(index) {
  if (index) {
    const element = document.getElementById(`[${index[0]}-${index[1]}]`);
    element.style.border = 'none';
  }
}

function setSelection(index) {
  if (index) {
    const element = document.getElementById(`[${index[0]}-${index[1]}]`);
    element.style.border = "solid 4px snow";
  }
}

const Questions = () => {
  const { formData, setFormData, authTokens, setAuthTokens, api } = useFormContext();
  const rotas = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentIndex, setCurrentIndex] = useState([0,0]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [competences, setCompetences] = useState(null);
  const [naoAplica, setNaoAplica] = useState(false)
  const bloomMatrix = blooms['matrix'];
  // const [scene, setScene] = useState(null);

  useEffect(()=>{
    let accessTk = authTokens ? authTokens.access : JSON.parse(localStorage.getItem("authTokens")).access;
    // se o usuario recarregar a página

    const fetchData = async ()=>{
      let compt = await api.get_competences(accessTk);
      setCompetences(compt.competences);
    }
    fetchData();
  }, [])

  useEffect(() => {
    // let dimentions = [window.innerWidth, 360]
    // const Scene3d = new SceneInit('myThreeJsCanvas', 'canvasContainer', dimentions, setCurrentIndex, setSelectedIndex);
    // Scene3d.initialize();
    // Scene3d.animate();
    // Scene3d.createMesh();
    // setScene(Scene3d);
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
      <QuestionText>{competences && competences[currentQuestion].descricao}</QuestionText>
      <FormControlLabel control={
        <Checkbox 
          sx={{
              color: pink[200],
              padding: '5px',
              '&.Mui-checked': {color: pink[100]},
              '& .MuiSvgIcon-root': { fontSize: 20 }
            }}
          onChange={() => {
            setNaoAplica(!naoAplica);
            if(selectedIndex) {
              clearSelection(selectedIndex);
              setSelectedIndex(null);
            }
            let compts = formData.compts ? formData.compts : {};
            compts[currentQuestion] = "";
            setFormData({...formData, compts: compts});
          }}
        />
        }
        label="Não se aplica"
        sx={{color: "#f2f2f2", marginTop: "-.6rem", marginBottom: "1rem", "& .MuiTypography-root": {fontSize: 16} }}
      />
      <Box
        sx={{
          height: "auto",
          width: "100%",
          display:'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems:'center',
          visibility: naoAplica ? 'hidden' : 'visible'
        }}
      >
      <>
      {/* Header Horizontal */}
        <Box
          sx={{
            height: "1.5rem",
            width: "100%",
            display:'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems:'center',
            gap: ".4rem"
          }}
        >
          {blooms.dimensoes[0].map((item, index) => (
              <MatrixItem key={index} bgcolor={'none'} HHeader={true} VHeader={false}>{item}</MatrixItem>
          ))}
        </Box>
      {/* Fim Header Horizontal */}
        <Box
          sx={{
            height: "inherit",
            width: "inherit",
            display:'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems:'center',
            flexWrap: 'wrap',
            gap: ".4rem"
          }}
        >
          {/* Aqui vai o diagrama da Taxonomia de Bloom */}
          <Box
            sx={{
              display:'flex',
              position: "relative",
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems:'center',
              gap: ".4rem"
            }}
            >
            {blooms.dimensoes[1].map((item, index) => (
                  <MatrixItem key={index} bgcolor={'none'} VHeader={true} HHeader={false}>{item}</MatrixItem>
            ))}
          </Box>
          {bloomMatrix.map((linha, indexRow) => (
            <Box
            key={indexRow}
            sx={{
              display:'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems:'center',
              gap: ".4rem"
            }}
            >
              {linha.map((item, indexCol) => (
                <MatrixItem
                  key={indexCol}
                  id={`[${indexCol}-${indexRow}]`}
                  bgcolor={item.color}
                  description={item.description}
                  index={[indexCol, indexRow]}
                  selectedIdx = {selectedIndex}
                  onItemClick={setSelectedIndex}
                >
                  {item.title}
                </MatrixItem>
              ))}
            </Box>
          ))}
        </Box>
        </>
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
              let compts = formData.compts;
              // clearSelection(compts[currentQuestion]);
              clearSelection(compts[currentQuestion])
              setSelection(compts[currentQuestion-1]);
              setSelectedIndex(compts[currentQuestion-1]);
            }}
          >
            Anterior
          </Button>
          <Button
          disabled={selectedIndex == null && naoAplica == false}
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
            onClick={async () => {
              let compts = formData.compts ? formData.compts : {};
              compts[currentQuestion] = selectedIndex;
              setFormData({...formData, compts: compts});
              if (currentQuestion + 1 < competences.length){
                setCurrentQuestion(currentQuestion + 1);
                if(!compts[currentQuestion + 1]){
                  clearSelection(selectedIndex);
                  setSelectedIndex(null);
                } else {
                  clearSelection(compts[currentQuestion]);
                  setSelection(compts[currentQuestion+1]);
                  setSelectedIndex(compts[currentQuestion+1]);
                }
              } else {
                await api.insert_blooms(authTokens.access, {...formData, compts: compts});
                rotas.push('/obrigado')
              }
            }}
          >
            {competences && currentQuestion + 1 < competences.length ? 'Próximo' : 'Enviar'}
          </Button>
        </Box>
        {/* Stepper */}
        <Stepper activeStep={currentQuestion} alternativeLabel connector={<QontoConnector />}>
          {competences && competences.map((item) => (
            <Step key={[item.id]}>
              <StepLabel StepIconComponent={QontoStepIcon}></StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Box>

  )
}

export default Questions;