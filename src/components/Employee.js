/* eslint-disable no-undef */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import swal from "sweetalert";


// import { drawDOM, exportPDF } from "@progress/kendo-drawing";
import { Container, Grid, Table, Header, List } from "semantic-ui-react";
function Employee() {

    const [data, setData] = useState([]);
    const URL = 'http://localhost:4000/Employeelist';

    useEffect(() => {

        const fetchData = async () => {
            const res = await fetch(URL);
            const data = await res.json();
            console.log(data);
            setData(data);
        }
        fetchData();
    }, []);

    const downloadCSV = () => {
        const fetchData = async () => {

            const linkSource = 'http://localhost:4000/get-csv';
            const downloadLink = document.createElement("a");
            const fileName = 'employee.csv';

            downloadLink.href = linkSource;
            downloadLink.download = fileName;
            downloadLink.click();

        }
        fetchData();
    }

    return (
        <>
            <div className="container">
                <h1>List of Employee details</h1>
                <div style={{ textAlign: "center", marginBottom: 10 }}>
                    <button onClick={downloadCSV}>Download CSV</button>
                </div>

                <Grid.Column>
                    <Table attached='top' basic verticalAlign='top'>
                        <Table.Header>
                            <Table.Cell>Name</Table.Cell>
                            <Table.Cell>Email</Table.Cell>
                            <Table.Cell>mobile</Table.Cell>
                            <Table.Cell>Image</Table.Cell>
                        </Table.Header>
                        <Table.Body>
                            {data.map((el) => {
                                return (
                                    <Table.Row key={el._id}>
                                        <Table.Cell>{el.name}</Table.Cell>
                                        <Table.Cell>{el.email}</Table.Cell>
                                        <Table.Cell>{el.mobile}</Table.Cell>
                                        <Table.Cell> <img src={el.image} width="75px" height="100px" /></Table.Cell>
                                    </Table.Row>
                                );
                            })
                            }
                        </Table.Body>
                    </Table>

                </Grid.Column>



            </div>


        </>
    );
}

export default Employee;
