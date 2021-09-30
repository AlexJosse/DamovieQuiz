import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

import axios from "axios";

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        color: "white",
        p: 1,
        borderRadius: 1,
        textAlign: "center",
        fontSize: 19,
        fontWeight: "700",
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  sx: PropTypes.object,
};

const Game = () => {
  const [imageUrlMovie, setImageUrlMovie] = useState("");
  const [titleMovie, setTitleMovie] = useState("");
  const [actorName, setActorName] = useState("");
  const [movieId, setMovieId] = useState(0);
  const [actorId, setActorId] = useState(0);
  const [actorPhoto, setActorPhoto] = useState("");
  const [open, setOpen] = useState(false);
  const [valide, setValide] = useState(false);

  const fetchMyApi = async () => {
    const result = await axios("http://localhost:4000/api/game/play");
    setMovieId(result.data[0][0].id);
    setImageUrlMovie(result.data[0][2].photo);
    setTitleMovie(result.data[0][1].name);
    setActorName(result.data[1].name);
    setActorId(result.data[1].id);
    setActorPhoto(result.data[1].photo);
  };

  useEffect(() => {
    fetchMyApi();
  }, []);

  const handleSubmit = async (appear) => {
    await axios
      .post("http://localhost:4000/api/game/play", {
        id_film: movieId,
        id_actor: actorId,
      })
      .then(function (response) {
        console.log(response.data);
        if (response.data !== appear) {
          setValide(false);  
        } else {
          setValide(true);
        }
        setOpen(true);
      })
      .catch(function (error) {
        console.log(error);
      });
      fetchMyApi();
  };

  const handleClose = () => {
    setOpen(!open);
  }

  return (
    <Grid container justify="center">
      <Box
        sx={{ display: "justifyContent", p: 1, bgcolor: "background.paper" }}
      >
        <Card>
          <CardHeader title={titleMovie} />
          <CardMedia component="img" image={imageUrlMovie} />
          &ensp;
        </Card>
        <Card>
          <CardHeader title={actorName} />
          <CardMedia component="img" image={actorPhoto} />
          &ensp;
        </Card>
        <Stack direction="row" spacing={40}>
          <Button onClick={() => handleSubmit(true)} color="success" variant="contained">
            Appeared in this movie
          </Button>
          <Button onClick={() => handleSubmit(false)} color="error" variant="contained">
            Doesn't
          </Button>
        </Stack>
      </Box>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>The answer is {valide ? 'correct' : 'incorrect'}</DialogTitle>
        <Button onClick={handleClose} color={valide ? 'success' : 'error'} variant="contained">
            Close
          </Button>
      </Dialog>
    </Grid>
  );
};

export default Game;
