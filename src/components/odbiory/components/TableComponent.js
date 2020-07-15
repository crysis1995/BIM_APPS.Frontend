import React from "react";
import { Table, Form, Tooltip, OverlayTrigger } from "react-bootstrap";
import { connect } from "react-redux";
import { v4 } from "uuid";
import { setJobDoneValue, saveData } from "../redux/actions";

function TableComponent(props) {
    return (
        <Table className="mt-3" hover>
            <thead>
                <tr>
                    <th>Nazwa roboty</th>
                    <th>Metrów roboty</th>
                    <th>Stopień zaawansowania</th>
                    <th>Metrów wykonanych</th>
                </tr>
            </thead>
            <tbody>
                {props.jobs &&
                    Object.keys(props.jobs).map((job) => (
                        <tr key={v4()}>
                            <OverlayTrigger
                                placement={"top"}
                                overlay={
                                    <Tooltip id={`tooltip-top`}>
                                        {[
                                            ...new Set(
                                                props.objects
                                                    .filter((obj) =>
                                                        obj.type_relation.jobs.reduce(
                                                            (prev, acc) =>
                                                                prev ||
                                                                acc.id === job,
                                                            false
                                                        )
                                                    )
                                                    .map(
                                                        (e) =>
                                                            e.type_relation.name
                                                    )
                                            ),
                                        ].map((e) => (
                                            <React.Fragment key={v4()}>
                                                <span>{e}</span>
                                                <br />
                                            </React.Fragment>
                                        ))}
                                    </Tooltip>
                                }
                            >
                                <td>{props.jobs[job].name}</td>
                            </OverlayTrigger>
                            <OverlayTrigger
                                placement={"top"}
                                overlay={
                                    <Tooltip id={`tooltip-top`}>
                                        {
                                            <>
                                                <span>
                                                    {props.objects
                                                        .filter((obj) =>
                                                            obj.type_relation.jobs.reduce(
                                                                (prev, acc) =>
                                                                    prev ||
                                                                    acc.id ===
                                                                        job,
                                                                false
                                                            )
                                                        )
                                                        .map((e) => e.area)
                                                        .join("+")}
                                                </span>
                                            </>
                                        }
                                    </Tooltip>
                                }
                            >
                                <td>
                                    <span>
                                        {Math.round(
                                            props.objects
                                                .filter((obj) =>
                                                    obj.type_relation.jobs.reduce(
                                                        (prev, acc) =>
                                                            prev ||
                                                            acc.id === job,
                                                        false
                                                    )
                                                ).reduce(
                                                (prev, curr) =>
                                                    prev + curr.area,
                                                0
                                            ) * 100
                                        ) / 100}{" "}
                                        m<sup>2</sup>
                                    </span>
                                </td>
                            </OverlayTrigger>
                            <td>
                                <Form.Control
                                    onChange={(e) => {
                                        props.setJobDoneValue(
                                            props.jobs[job].id,
                                            parseFloat(e.target.value)
                                        );
                                    }}
                                    size={"sm"}
                                    as="select"
                                    value={props.jobs[job].value}
                                    custom
                                >
                                    <option value="">Wybierz</option>
                                    <option value="0">0%</option>
                                    <option value="0.1">10%</option>
                                    <option value="0.2">20%</option>
                                    <option value="0.3">30%</option>
                                    <option value="0.4">40%</option>
                                    <option value="0.5">50%</option>
                                    <option value="0.6">60%</option>
                                    <option value="0.7">70%</option>
                                    <option value="0.8">80%</option>
                                    <option value="0.9">90%</option>
                                    <option value="1">100%</option>
                                </Form.Control>
                            </td>
                            <td>
                                <span>
                                    {props.jobs[job].value
                                        ? Math.round(
                                        props.objects
                                            .filter((obj) =>
                                                obj.type_relation.jobs.reduce(
                                                    (prev, acc) =>
                                                        prev ||
                                                        acc.id === job,
                                                    false
                                                )
                                            ).reduce(
                                                  (prev, curr) =>
                                                      prev + curr.area,
                                                  0
                                              ) *
                                                  100 *
                                                  props.jobs[job].value
                                          ) / 100
                                        : 0}{" "}
                                    m<sup>2</sup>
                                </span>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </Table>
    );
}

const mapStateToProps = ({ RoomsReducer }) => ({
    ...RoomsReducer,
});

const mapDispatchToProps = { setJobDoneValue, saveData };

export default connect(mapStateToProps, mapDispatchToProps)(TableComponent);
