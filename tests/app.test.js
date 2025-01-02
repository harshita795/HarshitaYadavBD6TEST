const request = require("supertest");
const { app } = require("../index.js");
const {
  getAllPackages,
  getPackageByDestination,
  addBooking,
  updateAvaialabeSlot,
  getBookingByPackageId,
} = require("../controllers.js");
let http = require("http");

jest.mock("../controllers.js", () => ({
  ...jest.requireActual("../controllers.js"),
  getAllPackages: jest.fn(),
  getPackageByDestination: jest.fn(),
  addBooking: jest.fn(),
  updateAvaialabeSlot: jest.fn(),
  getBookingByPackageId: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Endpoints Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("GET API /shows/ should return all packages", async () => {
    const mockResponses = [
      {
        packageId: 1,
        destination: "Paris",
        price: 1500,
        duration: 7,
        availableSlots: 10,
      },
      {
        packageId: 2,
        destination: "Rome",
        price: 1200,
        duration: 5,
        availableSlots: 15,
      },
      {
        packageId: 3,
        destination: "Tokyo",
        price: 2000,
        duration: 10,
        availableSlots: 8,
      },
      {
        packageId: 4,
        destination: "New York",
        price: 1700,
        duration: 7,
        availableSlots: 12,
      },
      {
        packageId: 5,
        destination: "Dubai",
        price: 1100,
        duration: 4,
        availableSlots: 20,
      },
      {
        packageId: 6,
        destination: "Sydney",
        price: 2500,
        duration: 12,
        availableSlots: 5,
      },
      {
        packageId: 7,
        destination: "Cape Town",
        price: 1800,
        duration: 8,
        availableSlots: 6,
      },
      {
        packageId: 8,
        destination: "Bangkok",
        price: 800,
        duration: 3,
        availableSlots: 25,
      },
      {
        packageId: 9,
        destination: "Barcelona",
        price: 1400,
        duration: 6,
        availableSlots: 10,
      },
      {
        packageId: 10,
        destination: "Bali",
        price: 1300,
        duration: 5,
        availableSlots: 15,
      },
      {
        packageId: 11,
        destination: "Istanbul",
        price: 1000,
        duration: 4,
        availableSlots: 18,
      },
      {
        packageId: 12,
        destination: "London",
        price: 1900,
        duration: 9,
        availableSlots: 7,
      },
      {
        packageId: 13,
        destination: "Hawaii",
        price: 2200,
        duration: 10,
        availableSlots: 8,
      },
      {
        packageId: 14,
        destination: "Moscow",
        price: 1600,
        duration: 8,
        availableSlots: 10,
      },
      {
        packageId: 15,
        destination: "Athens",
        price: 1200,
        duration: 6,
        availableSlots: 12,
      },
    ];

    getAllPackages.mockReturnValue(mockResponses);

    const res = await request(app).get("/packages");
    expect(res.status).toBe(200);
    expect(res.body.packages).toEqual(mockResponses);
  });

  it("GET /packages/:destination should return all packages for a given destination", async () => {
    const destination = "Paris";
    const mockResponse = [
      {
        packageId: 1,
        destination: "Paris",
        price: 1500,
        duration: 7,
        availableSlots: 10,
      },
    ];

    getPackageByDestination.mockReturnValue(mockResponse);

    const res = await request(app).get(`/packages/${destination}`);
    expect(res.status).toBe(200);
    expect(res.body.package).toEqual(mockResponse);
  });

  it("POST /bookings should add a new booking", async () => {
    const mockResponse = {
      bookingId: 1,
      packageId: 1,
      customerName: "Anjali Seth",
      bookingDate: "2024-12-01",
      seats: 2,
    };

    addBooking.mockReturnValue(mockResponse);

    const res = await request(app).post("/bookings").send({
      packageId: 1,
      customerName: "Anjali Seth",
      bookingDate: "2024-12-01",
      seats: 2,
    });
    expect(res.status).toBe(201);
    expect(res.body.booking).toEqual(mockResponse);
  });

  it("POST /packages/seats-update should update available slots", async () => {
    const packageId = 1;
    const seatsBooked = 5;
    const mockResponse = {
      packageId: 1,
      destination: "Paris",
      price: 1500,
      duration: 7,
      availableSlots: 5,
    };

    updateAvaialabeSlot.mockReturnValue(mockResponse);

    const res = await request(app).post("/packages/update-seats").send({
      packageId,
      seatsBooked,
    });
    expect(res.status).toBe(200);
    expect(res.body.package).toEqual(mockResponse);
  });

  it("GET /bookings/:packageId should return all bookings for a given package", async () => {
    const packageId = 1;
    const mockResponse = [
      {
        bookingId: 1,
        packageId: 1,
        customerName: "Anjali Seth",
        bookingDate: "2024-12-01",
        seats: 2,
      },
    ];

    getBookingByPackageId.mockReturnValue(mockResponse);

    const res = await request(app).get(`/bookings/${packageId}`);
    expect(res.status).toBe(200);
    expect(res.body.bookings).toEqual(mockResponse);
  });
});
