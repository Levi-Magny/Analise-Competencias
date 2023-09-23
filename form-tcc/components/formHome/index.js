'use client';

import { Box, Button, Container, Grid, MenuItem } from "@mui/material"
import TextField from "@mui/material/TextField"
import dados from '../../data/materias.json'
import { useRouter } from 'next/router';
import { FormContext, useFormContext } from "../../contexts/formcontext";
import { useContext, useEffect } from "react";

const UserInfo = ({setSubmitted}) => {
    const rotas = useRouter();
    const {formData, setFormData, docente, setDocente} = useFormContext()

    useEffect(() => {
        const formS = JSON.parse(localStorage.getItem("form"));
        if(formS){
            setFormData(formS);
            setDocente(formS.docente)
        }
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
                <Box
                    component="form"
                    noValidate
                    sx={{ 
                        mt: 3,
                        width:'40vw' 
                    }}
                    onSubmit={(event)=>{
                        event.preventDefault();
                        setSubmitted(true);
                        setTimeout(() => {
                        rotas.push('/ementa');
                        }, 500);
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="given-name"
                                name="Name"
                                required
                                fullWidth
                                id="name"
                                label="Docente"
                                autoFocus
                                value={docente}
                                onChange={(event) => {
                                    let data = formData;
                                    data.docente = event.target.value
                                    setDocente(event.target.value)
                                    setFormData(data)
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
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
                                    data.materia = event.target.value
                                    setFormData(data)
                                    localStorage.setItem("form", JSON.stringify(data));
                                }}
                            >
                                {dados.materias.map((materia) => (
                                    <MenuItem key={materia.id} value={materia.id}>
                                        {materia.Nome}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3,
                            mb: 2,
                            backgroundColor: '#7A5DAB',
                        }}
                    >
                        Iniciar
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default UserInfo;