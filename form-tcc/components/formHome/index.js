'use client';

import { Box, Button, Container, Grid, MenuItem, capitalize } from "@mui/material"
import TextField from "@mui/material/TextField"
import { useRouter } from 'next/router';
import { FormContext, useFormContext } from "../../contexts/formcontext";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const UserInfo = ({setSubmitted}) => {
    const rotas = useRouter();
    const {formData, setFormData, docente, setDocente, authTokens, api} = useFormContext();
    const [docentesArray, setDocentesArray] = useState(null)
    const [materiaArray, setMateriaArray] = useState(null)
    const [termoAceito, setTermoAceito] = useState(null)
    
    useEffect(() => {
        const formS = JSON.parse(localStorage.getItem("form"));
        if(formS){
            setFormData(formS);
            setDocente(formS.docente);
        }

        const fetchData = async ()=>{
            let dosc = await api.get_docentes(authTokens.access);
            setDocentesArray(dosc.docentes);
        }
        fetchData();
    }, [])
    
    useEffect(() => {
        localStorage.setItem("form", JSON.stringify(formData));
    }, [formData, docente])

    return (
        <Container component="main" maxWidth="md">
            <Box 
                sx={{
                    marginTop:8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                {docentesArray ? <Box
                    component="form"
                    noValidate
                    sx={{ 
                        mt: 3,
                        width: '60vw'
                    }}
                    onSubmit={(event)=>{
                        event.preventDefault();
                        setSubmitted(termoAceito);
                    }}
                >
                    <Grid container spacing={1} sx={{alignItems: "center", justifyContent: "center"}}>
                        <Grid item xs={12} sm={8}>
                            <TextField
                                autoComplete="given-name"
                                name="Name"
                                required
                                fullWidth
                                select
                                defaultValue="-1"
                                id="name"
                                label="Docente"
                                autoFocus
                                onChange={(event) => {
                                    let data = formData;
                                    data.docente = docentesArray[Number(event.target.value)];
                                    setTermoAceito([data.docente.termo_aceito, data.docente.id]);
                                    data.materia = docentesArray[Number(event.target.value)].materias[0].id;
                                    setDocente(event.target.value);
                                    setFormData(data);
                                    setMateriaArray(docentesArray[Number(event.target.value)].materias);
                                }}
                            >
                            {docentesArray.map((docente, index) => (
                                <MenuItem key={docente.id} value={index}>
                                    {docente.nome.toUpperCase()}
                                </MenuItem>
                            ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            {materiaArray && <TextField
                                name="componente"
                                required
                                fullWidth
                                id="component"
                                label="Componente Curricular"
                                select
                                defaultValue="0"
                                placeholder="Selecione"
                                autoFocus
                                value={formData.materia}
                                onChange={(event) => {
                                    let data = formData;
                                    data.materia = event.target.value;
                                    setFormData({...data});
                                    localStorage.setItem("form", JSON.stringify(data));
                                }}
                            >
                                {materiaArray.map((materia) => (
                                    <MenuItem key={materia.id} value={materia.id}>
                                        {materia.nome.toUpperCase()}
                                    </MenuItem>
                                ))}
                            </TextField>}
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mb: 2,
                                    backgroundColor: '#7A5DAB',
                                }}
                            >
                                Iniciar
                            </Button>
                        </Grid>
                    </Grid>
                </Box> : <Skeleton
                    height='2.5rem'
                    width='40vw'
                    style={{
                        marginTop: '1rem',
                    }}
                    count={2}
                />}
            </Box>
        </Container>
    )
}

export default UserInfo;