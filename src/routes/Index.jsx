import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../pages/Navbarpage';
import About from '../pages/Aboutpage';
import Projects from '../pages/Projectspage';
import Services from '../pages/Servicespage';
import Homepage from '../pages/Homepage';
import Loginpage from '../pages/Loginpage';
import Bannerpage from '../pages/Bannerpage';
import Footerpage from '../pages/Footerpage';
import Signuppage from '../pages/Signuppage';
import Adminloginpage from '../pages/Adminloginpage';
import Homepage1 from '../pages/Homepage1';
import Forgotpasswordpage from '../pages/Forgotpasswordpage';
import Realtimelocationpage from '../pages/Realtimelocationpage';
import Admindashboardpage from '../pages/Admindashboardpage';
import Communitysupportpage from '../pages/Communitysupportpage';
import Educationalresourcespage from '../pages/Educationalresourcespage';
import Saferoutespage from '../pages/Saferoutespage';
import Anonymousreportingpage from '../pages/Anonymousreportingpage';
import Customizablesettingspage from '../pages/Customizablesettingspage';
import Navbar1 from '../components/Navbar1';
import About1page from '../pages/About1page';
import Services1page from '../pages/Services1page';
import Anoreppage from '../pages/Anoreppage';
import Comspage from '../pages/Comspage';
import Userlistpage from '../pages/Userlistpage';
import Signallistpage from '../pages/Signallistpage';
import Supportlistpage from '../pages/Supportlistpage';
import Reportslistpage from '../pages/Reportslistpage';
import Addedurespage from '../pages/Addedurespage';
import Viewedurespage from '../pages/Viewedurespage';
import Notificationpage from '../pages/Notificationpage';
import Userprofilepage from '../pages/Userprofilepage';
import Footer1page from '../pages/Footer1page';
import Banner1page from '../pages/Banner1page';
import Editprofilepage from '../pages/Editprofilepage';
import Myreportspage from '../pages/Myreportspage';
import Distresssignalpage from '../pages/Distresssignalpage';
import Resetpasswordpage from '../pages/Resetpasswordpage';
import Mapcomponentpage from '../pages/Mapcomponentpage';
import Piechartreportpage from '../pages/Piechartreportpage';
import Datewisereportspage from '../pages/Datewisereportspage';


function Index() {
  // const user = {
  //   name: 'User',
  //   role: 'user'
  //   // role: 'admin'
  // };

  return (
      <BrowserRouter>
          <Routes> 
                  <Route path='/homepage' element={<><Navbar1 /><Homepage1 /><Footer1page/></>}/>
                  <Route path='/' element={<><Navbar /><Homepage /><Footerpage /></>} />
                  <Route path='/about' element={<><Navbar /><About /><Footerpage /></>} />
                  <Route path='/about1' element={<><Navbar1 /><About1page /><Footer1page /></>} />
                  <Route path='/services1' element={<><Navbar1 /><Services1page /><Footer1page /></>} />
                  <Route path='/projects' element={<><Navbar /><Projects /><Footerpage /></>} />
                  <Route path='/services' element={<><Navbar /><Services /><Footerpage /></>} />
                  <Route path='/login' element={<><Navbar /><Loginpage /><Footerpage /></>} />
                  <Route path='/forgot-password' element={<><Navbar /><Forgotpasswordpage /><Footerpage /></>} />
                  <Route path='/banner' element={<Bannerpage />} />
                  <Route path='/banner1' element={<Banner1page />} />
                  <Route path='/signup' element={<><Navbar /><Signuppage /><Footerpage /></>} />
                  <Route path='/rtloc'
                   element={<><Navbar1 /><Realtimelocationpage /><Footerpage /></>} />
                  <Route path='/coms' element={<><Navbar1 /><Communitysupportpage /><Footerpage /></>} />
                  <Route path='/comsview' element={<><Navbar1 /><Comspage /><Footerpage /></>} />
                  <Route path='/edures' element={<><Navbar1 /><Educationalresourcespage /><Footerpage /></>} />
                  <Route path='/saferoutes' element={<><Navbar1 /><Saferoutespage /><Footerpage /></>} />
                  <Route path='/anorep' element={<><Navbar1 /><Anonymousreportingpage /><Footerpage /></>} />
                  <Route path='/anorepview' element={<><Navbar1 /><Anoreppage /><Footerpage /></>} />
                  <Route path='/myanorepview' element={<><Navbar1 /><Myreportspage /><Footerpage /></>} />
                  <Route path='/cusset' element={<><Navbar1 /><Customizablesettingspage /><Footerpage /></>} />
                  <Route path='/notification' element={<><Navbar1 /><Notificationpage /><Footerpage /></>} />
                  <Route path='/userprofile' element={<><Navbar1 /><Userprofilepage /><Footerpage /></>} />
                  <Route path='/editprofile' element={<><Navbar1 /><Editprofilepage /><Footerpage /></>} />
                  <Route path='/signal' element={<><Navbar1 /><Distresssignalpage/><Footerpage /></>} />
                  <Route path='/reset-password' element={<><Navbar /><Resetpasswordpage/><Footerpage /></>} />
                  <Route path='/map' element={<><Navbar1 /><Mapcomponentpage/><Footerpage /></>} />
          </Routes>
          <Routes>
              <Route path='/admin'>
              <Route path='admin-login' element={<Adminloginpage />} />
              <Route path='admin-dashboard' element={<Admindashboardpage />} />
              <Route path='userlist' element={<Userlistpage />} />
              <Route path='signallist' element={<Signallistpage />} />
              <Route path='supportlist' element={<Supportlistpage />} />
              <Route path='reportslist' element={<Reportslistpage />} />
              <Route path='addedures' element={<Addedurespage/>} />
              <Route path='viewedures' element={<Viewedurespage />} />
              <Route path='piechart' element={<Piechartreportpage />} />
              <Route path='datereport' element={<Datewisereportspage />} />
              </Route>
          </Routes>
      </BrowserRouter>   
  );
}
export default Index;