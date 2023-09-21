import { Box, Button, Container, Grid, MenuItem } from "@mui/material"
import TextField from "@mui/material/TextField"
import dados from '../../materias.json'

const UserInfo = () => {
    return (
        <Container component="main" maxWidth="md">
            <Box 
                sx={{
                    marginTop:2,
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
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="given-name"
                                name="Name"
                                required
                                fullWidth
                                id="name"
                                label="Nome Completo"
                                autoFocus
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
                                defaultValue="ECOI32.1"
                                placeholder="Selecione"
                                autoFocus
                            >
                                {dados.materias.map((materia) => (
                                    <MenuItem key={materia.codigo} value={materia.codigo}>
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

export default UserInfo