
import React,{useEffect,useState} from "react";

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import axios from 'axios';

const Tables = () => {
  let [form1, setForm1] = useState([]);
  let [userLength, setUserLength] = useState(null);
  
  var storedNames = JSON.parse(localStorage.getItem("user"));
  var token =storedNames.Data.session_token


var api_headers={ method: 'GET',
  headers: {'Authorization': `Bearer ${token}`,
  "Access-Control-Allow-Origin" : "*", 
  "Access-Control-Allow-Credentials" : true },
}
  useEffect(() => {
    
  axios.get(`http://localhost:3000/GetPlayerDetails`,api_headers)
      .then(res => {
        setForm1(res.data.Data);
      });
  }, []);
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Card tables</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                    <th scope="col">NO</th>
                      <th scope="col">Driver_Name</th>
                      <th scope="col">Truck_Number</th>
                      <th scope="col">Bank_Name</th>
                      <th scope="col">Bank_Account_Number</th>
                      <th scope="col">IFSCCode</th>
                      <th scope="col">Branch</th>
                      <th scope="col">Cheque_Image</th>
                      <th scope="col">DL_Photo</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {form1.map((x,i) => {
                            return (
                  <tr key={x.id} style={{borderBottom: "1px solid lightgray"}}>
                  <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap ">
                      {i+1}
                    </td>
                      <td className="border-t-0  align-middle border-l-0 border-r-0 text-xs whitespace-nowrap ">
                          {x.DriverName}
                    </td>
                    <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap  ">
                          {x.TruckNumber}
                     </td>
                     <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap ">
                         {x.BankName}
                    </td><td className="border-t-0  align-middle border-l-0 border-r-0 text-xs whitespace-nowrap ">
                        {x.BankAccountNumber}
                    </td><td className="border-t-0  align-middle border-l-0 border-r-0 text-xs whitespace-nowrap ">
                        {x.IFSCCode}
                    </td><td className="border-t-0  align-middle border-l-0 border-r-0 text-xs whitespace-nowrap ">
                         {x.Branch}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <img src={(x.signature) === "" || null ? ("https://i.stack.imgur.com/y9DpT.jpg") : ("http://localhost:3000/GetPlayerDetails/"+x.ChequeImage)} style={{height: "40px",width: "auto"}} loading="lazy" />               
                  </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <img src={(x.signature) === "" || null ? ("https://i.stack.imgur.com/y9DpT.jpg") : ("http://localhost:3000/GetPlayerDetails/"+x.DLPhoto)} style={{height: "40px",width: "auto"}} loading="lazy" />               
                  </td>
                    </tr>
                    )})}
                  </tbody>
                </Table>
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    {/* <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem className="disabled">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination> */}
                  </nav>
                </CardFooter>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
}

export default Tables;
