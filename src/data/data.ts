import { v4 as uuid } from "uuid";

export const DUMMY_CANDIDATES = [
  {
    name: "Maggie Frank",
    dateOfBirth: "03/12/1990",
    contactNumber: "+381662312123",
    email: "maggie.frank@gmail.com",
    skills: [
      { id: uuid(), value: "PHP" },
      { id: uuid(), value: "MySql" },
    ],
    id: "1",
  },
  {
    name: "Ruby Elliott",
    dateOfBirth: "06/18/1995",
    contactNumber: "+381662312123",
    email: "ruby.elliott@gmail.com",
    skills: [
      { id: uuid(), value: "Adobe Photoshop" },
      { id: uuid(), value: "Adobe XD" },
    ],
    id: "2",
  },
  {
    name: "Raphael Ward",
    dateOfBirth: "05/15/1989",
    contactNumber: "+381662312123",
    email: "raphael.ward@gmail.com",
    skills: [{ id: uuid(), value: "Adobe Illustrator" }],
    id: "3",
  },
  {
    name: "Robbie Waters",
    dateOfBirth: "12/31/1992",
    contactNumber: "+381662312123",
    email: "robbie.waters@gmail.com",
    skills: [
      { id: uuid(), value: "HTML" },
      { id: uuid(), value: "CSS" },
    ],
    id: "4",
  },
  {
    name: "Liam Kirk",
    dateOfBirth: "08/07/1990",
    contactNumber: "+381662312123",
    email: "liam.kirk@gmail.com",
    skills: [{ id: uuid(), value: "JavaScript" }],
    id: "5",
  },
  {
    name: "Rob Frank",
    dateOfBirth: "05/19/1985",
    contactNumber: "+381662312123",
    email: "rob.frank@gmail.com",
    skills: [
      { id: uuid(), value: "HTML" },
      { id: uuid(), value: "CSS" },
      { id: uuid(), value: "JavaScript" },
    ],
    id: "6",
  },
];
