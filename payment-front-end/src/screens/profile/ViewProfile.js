// import {
//   FormControl, Grid, Input,
//   InputLabel, Snackbar
// } from '@material-ui/core';
// import Button from '@material-ui/core/Button';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import * as React from 'react';
// import { getUser } from '../../util/apiCalls';
// import Dialog from '@material-ui/core/Dialog';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import IconButton from '@material-ui/core/IconButton';
// import { styled } from '@material-ui/core/styles';
// import PropTypes from 'prop-types';
// import { registerUser } from '../../util/apiCalls';
// import Profile from '../../screens/profile/Profile';
// import CancelIcon  from '@material-ui/icons/Cancel';
// import EditIcon  from '@material-ui/icons/Edit';
// export default function ViewProfile({ toggleModal }) {
//   //This js is to fetch user details, for only view purpose

//   const [email, setEmail] = React.useState("");
//   const [name, setName] = React.useState("");
//   const [cnumber, setCnumber] = React.useState("");
//   const [anumber, setAnumber] = React.useState("");
//   const [isEditOpen, setIsEditOpen] = React.useState(false);
//   const emailChange = (event) => {
//     setEmail(event.target.value);
//   }

//   const nameChange = (event) => {
//     setName(event.target.value);
//   }
 
//   const cnumberChange = (event) => {
//     setCnumber(event.target.value);
//   }

//   const anumberChange = (event) => {
//     setAnumber(event.target.value);
    
//   }
//   const clickUpdateProfile = () => {
//     toggleUpdateProfileModal();
//   }

//   const toggleUpdateProfileModal = () => {
//     setIsEditOpen(!isEditOpen);
    
//   }


//   React.useEffect(() => {
//   getUser( localStorage.getItem("username"), localStorage.getItem("email")).then(resp => {
//     resp.json().then(data => {
//       console.log(data);
//       setEmail(data.username);
//       setName(data.name);
//       setCnumber(data.cnumber);
//       setAnumber(data.accNo);
//       console.log(data);
//     });
//   }).catch(error => {
//     console.log("login user err " + error);
//   });
// }, []);
// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   '& .MuiDialogContent-root': {
//     padding: theme.spacing(2),
//   },
//   '& .MuiDialogActions-root': {
//     padding: theme.spacing(1),
//   },
// }));

// const BootstrapProfileDialog = styled(Dialog)(({ theme }) => ({
//   '& .MuiDialogContent-root': {
//     padding: theme.spacing(2),
//   },
//   '& .MuiDialogActions-root': {
//     padding: theme.spacing(1),
//     minWidth:'500px'
//   },
// }));

// const BootstrapDialogTitle = (props) => {
//   const { children, onClose, ...other } = props;
//   return (
//     <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
//       {children}
//       {onClose ? (
//         <IconButton
//           aria-label="close"
//           onClick={onClose}
//           sx={{
//             position: 'absolute',
//             right: 8,
//             top: 8,
//             color: (theme) => theme.palette.grey[500],
//           }}
//         >
//         </IconButton>
//       ) : null}
//     </DialogTitle>
//   );
// };

// BootstrapDialogTitle.propTypes = {
//   children: PropTypes.node,
//   onClose: PropTypes.func.isRequired,
// };

//   return (
//     <React.Fragment>
//       <div style={{background: 'linear-gradient(110deg, #f2f5e9 60%, #b3e0ff 60%)' }}>
//       <DialogContent>
//         <FormControl required={true} fullWidth sx={{ m: 1 }} variant="standard" style={{ textAlign: 'center' }}>
//           <InputLabel htmlFor="standard-adornment-fname">Your Name</InputLabel>
//           <Input
//             id="standard-adornment-fname"
//             type={'text'}
//             value={name}
//             disabled={true}
//           />
//         </FormControl><br></br><br></br>
        
//         <FormControl required={true} fullWidth sx={{ m: 1 }} variant="standard" style={{ textAlign: 'center' }}>
//           <InputLabel htmlFor="standard-adornment-email">Your Email</InputLabel>
//           <Input
//             id="standard-adornment-email"
//             type={'text'}
//             value={email}
//             disabled={true}
//           />
//         </FormControl>
//         <br></br>
//         <br></br>
        
//         <FormControl required={true} fullWidth sx={{ m: 1 }} variant="standard" style={{ textAlign: 'center' }}>
//           <InputLabel htmlFor="standard-adornment-cnumber">Your Contact Number</InputLabel>
//           <Input
//             id="standard-adornment-cnumber"
//             type={'text'}
//             value={cnumber}
//             disabled={true}
//           />
//         </FormControl><br></br>
//         <br></br>
//         <FormControl required={true} fullWidth sx={{ m: 1 }} variant="standard" style={{ textAlign: 'center' }}>
//           <InputLabel htmlFor="standard-adornment-cnumber">Your Account Number</InputLabel>
//           <Input
//             id="standard-adornment-cnumber"
//             type={'text'}
//             value={anumber}
//             disabled={true}
//           />
//         </FormControl><br></br>
//       </DialogContent>
//       <DialogActions align='center'>
//         <Grid container justify="center">
//           <Button variant="contained" style={{backgroundColor:'orange'}} onClick={toggleModal} > <CancelIcon/>CLOSE</Button>
//         </Grid>
//         <Grid xs={12}>
//           You want to update? <Button color="primary" onClick={clickUpdateProfile}> <EditIcon/>Edit Profile</Button>
//         </Grid>
//       </DialogActions>
//       <BootstrapDialog
//             onClose={toggleUpdateProfileModal}
//             aria-labelledby="customized-dialog-title"
//             open={isEditOpen}
//           >
//             <BootstrapDialogTitle id="customized-dialog-title" onClose={toggleUpdateProfileModal} className="toolHeader" style={{ textAlign: 'center', backgroundColor: 'orange', color: 'white' }}>
//               EDIT PROFILE
//             </BootstrapDialogTitle>

            
//                 <Profile toggleModal={toggleUpdateProfileModal} viewToggleModal={toggleModal} />
             
//           </BootstrapDialog>
//           </div>
//     </React.Fragment>
//   );
// }