import { Box, Step, StepLabel, Stepper, colors, Button, useMediaQuery, Checkbox, FormControlLabel } from "@mui/material";
import { styled } from '@mui/material/styles';
import MatrixItem from "../matrixItem";
import { pink } from "@mui/material/colors";
import Check from '@mui/icons-material/Check';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

import { Description, QuestionText, BoxItemMobile, HorizontalBox, Tips } from "..";
import { useFormContext } from "../../contexts/formcontext";
import blooms from '../../data/blooms.json';
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import MobileItemMatrix from "../mobileMatrixItem";
import {CompetenceItem, ScrollableBox} from "../scrollable"
import Tutorial from "../tutorial";
// import SceneInit from "../../libs/SceneInit";
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
      fontSize: 10,
    },
    '& .QontoStepIcon-circle': {
      width: 5,
      height: 5,
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

function areArraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

const Questions = () => {
  const { formData, setFormData, authTokens, setAuthTokens, api } = useFormContext();
  const rotas = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [qtdSelected, setQtdSelected] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [competences, setCompetences] = useState(null);
  const bloomMatrix = blooms['matrix'];
  const matches = useMediaQuery('(max-width:750px)');
  const [naoAplica, setNaoAplica] = useState(false);
  const [tutorial, setTutorial] = useState(true);
  // const [scene, setScene] = useState(null);

  useEffect(() => {
    let accessTk = authTokens ? authTokens.access : JSON.parse(localStorage.getItem("authTokens")).access;
    // se o usuario recarregar a página
    
    const fetchData = async () => {
      if(!competences){
        let compt = await api.get_competences(accessTk);
        setCompetences(compt.competences);
      }
    }
    fetchData();
    if (!matches) logicChangeQuestion(1);
  }, [])
  
  const matrixSelectionDesktop = ( idx ) => {
    let compts = formData.compts ? formData.compts : {};
    let dataToInsert = null;
    if(areArraysEqual(selectedIndex, idx)){
      setSelectedIndex(null);
      clearSelection(idx);
      dataToInsert = null;
      setQtdSelected(qtdSelected - 1);
    } else {
      setSelectedIndex(idx);
      dataToInsert = idx;
      
      // logic to qtd selected addition
      let add = selectedIndex ? 0 : 1; 
      setQtdSelected(qtdSelected + add);
    }
    compts[currentQuestion] = dataToInsert;
    setFormData({ ...formData, compts: compts });
  }
  const logicChangeQuestion = async ( idx ) => {    
    let compts = formData.compts ? formData.compts : {};
    setCurrentQuestion(idx);
    if (!compts[idx]) {
      clearSelection(selectedIndex);
      setSelectedIndex(null);
    } else {
      clearSelection(compts[currentQuestion]);
      setSelection(compts[idx]);
      setSelectedIndex(compts[idx]);
    }
  }

  const openTutorial = ()=>{
    setTutorial(true)
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <Tips onClick={openTutorial}>?</Tips>
      <Tutorial modal={tutorial} setModal={setTutorial}>Como preencher?</Tutorial>
      {/* Cabeçalho Mobile */}
      {matches && <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          justifyContent: "center"
        }}
      >
        <QuestionText>{competences && competences[currentQuestion].descricao}</QuestionText>
        <FormControlLabel control={

          <Checkbox
            sx={{
              color: pink[200],
              padding: '5px',
              '&.Mui-checked': { color: pink[100] },
              '& .MuiSvgIcon-root': { fontSize: 20 }
            }}
            onChange={() => {
              setNaoAplica(!naoAplica);
              if (selectedIndex) {
                clearSelection(selectedIndex);
                setSelectedIndex(null);
              }
              let compts = formData.compts ? formData.compts : {};
              compts[currentQuestion] = "";
              setFormData({ ...formData, compts: compts });
            }}
          />
        }
          label="Não se aplica"
          sx={{ color: "#f2f2f2", marginTop: "-.6rem", marginBottom: "1rem", "& .MuiTypography-root": { fontSize: 16 }, justifyContent:"center" }}
        />
      </Box>}
      {/* Fim Cabeçalho Mobile */}
      
      <Box
        sx={{
          height: "auto",
          width: "100%",
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          visibility: naoAplica ? 'hidden' : 'visible'
        }}
      >
        <>
          
          {/* Mobile */}
          {matches && <BoxItemMobile direction={'row'}>
            {bloomMatrix.map((linha, indexRow) => (
              <BoxItemMobile
                key={indexRow}
                direction={'column'}
              >
                {linha.map((item, indexCol) => (
                  <MobileItemMatrix
                    key={indexCol}
                    id={`[${indexCol}-${indexRow}]`}
                    bgcolor={item.color}
                    description={item.description}
                    index={[indexCol, indexRow]}
                    selectedIdx={selectedIndex}
                    onItemClick={setSelectedIndex}
                  >
                    {item.title}
                  </MobileItemMatrix>
                ))}
              </BoxItemMobile>
            ))}
          </BoxItemMobile>}
          
          {/* Desktop */}
          <HorizontalBox>


            {/* Competences List */}
            <ScrollableBox>
              {competences && competences.map((item) => (
                <CompetenceItem key={[item.id]} idx={item.id} onclick={logicChangeQuestion} selected={item.id == currentQuestion}>
                  <p>{item.descricao}</p>
                </CompetenceItem>
              ))}
            </ScrollableBox>
            {!matches && <Box
              sx={{
                height: "inherit",
                width: "inherit",
                display: matches ? 'none' : 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: ".4rem"
              }}
            >            
              {/* Header Horizontal */}
              <Box
                sx={{
                  height: "1.5rem",
                  width: "100%",
                  padding: matches ? '0 5vw' : '',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  gap: ".4rem"
                }}
              >
                {blooms.dimensoes[0].map((item, index) => (
                  <MatrixItem key={index} bgcolor={'none'} HHeader={true} VHeader={false}>{item}</MatrixItem>
                ))}
              </Box>
              {/* Fim Header Horizontal */}
              <HorizontalBox>
                {/* Aqui vai o diagrama da Taxonomia de Bloom */}
                {bloomMatrix.map((linha, indexRow) => (
                  <Box
                    key={indexRow}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
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
                        selectedIdx={selectedIndex}
                        onItemClick={matrixSelectionDesktop}
                      >
                        {item.title}
                      </MatrixItem>
                    ))}
                  </Box>
                ))}

                {/* Header Vertical */}
                <Box
                  sx={{
                    display: 'flex',
                    position: "relative",
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: ".4rem"
                  }}
                >
                  {blooms.dimensoes[1].map((item, index) => (
                    <MatrixItem key={index} bgcolor={'none'} VHeader={true} HHeader={false}>{item}</MatrixItem>
                  ))}
                </Box>
                {/* Fim Header Vertical */}
              </HorizontalBox>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "right",
                  width: "100%",
                  marginTop: "5vh",
                }}
              >
                <Button
                  disabled={qtdSelected == 0}
                  sx={{
                    padding: '1rem 2rem',
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
                    setQtdSelected(0);
                    await api.insert_blooms(authTokens.access, formData);
                    rotas.push('/obrigado');
                  }}
                >
                  Enviar
                </Button>
              </Box>
            </Box>}
            {/* Aqui termina o diagrama da Taxonomia de Bloom */}


          </HorizontalBox>
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
          display: matches ? "flex" : "none",
          flexDirection: "row",
          justifyContent: "center",
          gap: '1rem',
          mt: "1rem"
        }}>
          <Button
            disabled={currentQuestion == 0}
            sx={{
              padding: '.5rem 1.5rem',
              borderRadius: '.5rem',
              minWidth: '8rem',
              color: "#FFF",
              backgroundColor: "#7A5DAB",
              fontSize: '.7rem',
              ":hover": {
                backgroundColor: "#52FDDE",
                color: "#7A5DAB"
              }
            }}
            onClick={() => {
              setCurrentQuestion(currentQuestion > 0 ? currentQuestion - 1 : currentQuestion);
              let compts = formData.compts ? formData.compts : {};
              // clearSelection(compts[currentQuestion]);
              if(compts.hasOwnProperty(currentQuestion)) {
                clearSelection(compts[currentQuestion]);
              }
              if (compts.hasOwnProperty(currentQuestion - 1)) {
                setSelection(compts[currentQuestion - 1]);
                setSelectedIndex(compts[currentQuestion - 1]);
              }
            }}
          >
            Anterior
          </Button>
          <Button
            disabled={selectedIndex == null && naoAplica == false}
            sx={{
              padding: '.5rem 1.5rem',
              borderRadius: '.5rem',
              minWidth: '8rem',
              color: "#FFF",
              backgroundColor: "#7A5DAB",
              fontSize: '.7rem',
              ":hover": {
                backgroundColor: "#52FDDE",
                color: "#7A5DAB"
              }
            }}
            onClick={async () => {
              let compts = formData.compts ? formData.compts : {};
              compts[currentQuestion] = selectedIndex;
              setFormData({ ...formData, compts: compts });
              if (currentQuestion + 1 < competences.length) {
                setCurrentQuestion(currentQuestion + 1);
                if (!compts[currentQuestion + 1]) {
                  clearSelection(selectedIndex);
                  setSelectedIndex(null);
                } else {
                  clearSelection(compts[currentQuestion]);
                  setSelection(compts[currentQuestion + 1]);
                  setSelectedIndex(compts[currentQuestion + 1]);
                }
              } else {
                await api.insert_blooms(authTokens.access, { ...formData, compts: compts });
                rotas.push('/obrigado')
              }
            }}
          >
            {competences && currentQuestion + 1 < competences.length ? 'Próximo' : 'Enviar'}
          </Button>
        </Box>
        {/* Fim container com os botões */}
        
        
        {/* Stepper */}
        {matches && <Stepper activeStep={currentQuestion} alternativeLabel connector={<QontoConnector />}
        sx={{
          flexWrap: 'wrap',
          justifyContent: 'left',
        }}>
          {competences && competences.map((item) => (
            <Step key={[item.id]}>
              <StepLabel StepIconComponent={QontoStepIcon}></StepLabel>
            </Step>
          ))}
        </Stepper>}
      </Box>
    </Box>

  )
}

export default Questions;