// import { Button, Slider, TextField, Typography } from "@mui/material";
// import { grey } from "@mui/material/colors";
// import { makeStyles } from "@mui/styles";

// const useStyles = makeStyles({
//   thumb: {
//     color: "#000",
//   },
//   rail: {
//     color: `rgba(0, 0, 0, 0.26)`,
//   },
//   track: {
//     color: "#000",
//   },
//   textFieldWrapper: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 2,
//   },
//   textField: {
//     color: "black",
//     width: "70px",
//     "& input[type=number]": {
//       /* Сховати стрілки регулювання */
//       "-moz-appearance": "textfield",
//       "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
//         "-webkit-appearance": "none",
//         margin: 0,
//       },
//     },
//   },
//   button: {
//     width: "40px",
//     height: "40px",
//   },
// });

// const Price = ({ value, setPriceRange }) => {
//   const classes = useStyles();

//   const handleOkClick = () => {
//     setPriceRange(value);
//   };

//   return (
//     <div className="w-full p-1 flex flex-col justify-between rounded-lg">
//       <span className="text-black mb-3">Ціна</span>

//       <div className="flex items-center justify-center gap-4">
//         <div className="flex items-center justify-center gap-2">
//           <TextField
//             label="Від"
//             type="number"
//             variant="outlined"
//             InputLabelProps={{ shrink: true }}
//             className={classes.textField}
//             value={value[0]}
//             size="small"
//             onChange={(e) => {
//               setPriceRange([
//                 Math.min(Number(e.target.value), value[1]),
//                 value[1],
//               ]);
//             }}
//           />
//           <TextField
//             label="До"
//             type="number"
//             variant="outlined"
//             InputLabelProps={{ shrink: true }}
//             className={classes.textField}
//             size="small"
//             value={value[1]}
//             onChange={(e) => {
//               setPriceRange([
//                 value[0],
//                 Math.max(value[0], Math.min(9999, Number(e.target.value))),
//               ]);
//             }}
//           />
//         </div>
//         <Button
//           variant="outlined"
//           className={classes.button}
//           onClick={handleOkClick}
//         >
//           Ок
//         </Button>
//       </div>

//       <Slider
//         value={value}
//         onChange={(_, value) => setPriceRange(value)}
//         disableSwap
//         min={1}
//         max={9999}
//         classes={{
//           thumb: classes.thumb,
//           rail: classes.rail,
//           track: classes.track,
//         }}
//       />
//     </div>
//   );
// };

// export default Price;

import { Button, Slider, TextField } from "@mui/material";

const Price = ({ value, setPriceRange }) => {
  const handleOkClick = () => {
    setPriceRange(value);
  };

  return (
    <div className="w-full p-1 flex flex-col justify-between rounded-lg">
      <span className="text-black mb-3">Ціна</span>

      <div className="flex items-center justify-center gap-4">
        <div className="flex items-center justify-center gap-2">
          <TextField
            label="Від"
            type="number"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            className="color-black width-70px"
            value={value[0]}
            size="small"
            onChange={(e) => {
              setPriceRange([
                Math.min(Number(e.target.value), value[1]),
                value[1],
              ]);
            }}
          />
          <TextField
            label="До"
            type="number"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            className="color-black width-70px"
            size="small"
            value={value[1]}
            onChange={(e) => {
              setPriceRange([
                value[0],
                Math.max(value[0], Math.min(9999, Number(e.target.value))),
              ]);
            }}
          />
        </div>
        <Button
          variant="outlined"
          className="width-40px height-40px"
          onClick={handleOkClick}
        >
          Ок
        </Button>
      </div>

      <Slider
        value={value}
        onChange={(_, value) => setPriceRange(value)}
        disableSwap
        min={1}
        max={9999}
        className="thumb-black rail-rgba026 track-black"
      />
    </div>
  );
};

export default Price;
