import HotelDetails from "../models/hotel.js";
import RoomDetails from "../models/rooms.js";

// CREATE HOTEL
export const createHotel = async (req, res, next) => {
  try {
    const newHotel = new HotelDetails(req.body);

    const savedHotel = await newHotel.save();

    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

// UPDATE HOTEL
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await HotelDetails.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

// DELETE HOTEL
export const deleteHotel = async (req, res, next) => {
  try {
    await HotelDetails.findByIdAndDelete(req.params.id);

    res.status(200).json("Hotel deleted successfully.");
  } catch (err) {
    next(err);
  }
};

// GET SINGLE HOTEL
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await HotelDetails.findById(req.params.id);

    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

// GET ALL HOTELS
export const getAllHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;

  try {
    const hotels = await HotelDetails.find({
      ...others,
      cheapestPrice: {
        $gt: min || 1,
        $lt: max || 9999,
      },
    }).limit(req.query.limit);

    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

// COUNT BY CITY
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");

  try {
    const list = await Promise.all(
      cities.map((city) => {
        return HotelDetails.countDocuments({
          city: city.toLowerCase(),
        });
      })
    );

    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

// COUNT BY TYPE
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await HotelDetails.countDocuments({
      hotel_type: "hotel",
    });

    const apartmentCount = await HotelDetails.countDocuments({
      hotel_type: "apartment",
    });

    const resortCount = await HotelDetails.countDocuments({
      hotel_type: "resort",
    });

    const villaCount = await HotelDetails.countDocuments({
      hotel_type: "villa",
    });

    const cabinCount = await HotelDetails.countDocuments({
      hotel_type: "cabin",
    });

    res.status(200).json([
      { hotel_type: "Hotels", count: hotelCount },
      { hotel_type: "Apartments", count: apartmentCount },
      { hotel_type: "Resorts", count: resortCount },
      { hotel_type: "Villas", count: villaCount },
      { hotel_type: "Cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

// GET HOTEL ROOMS
export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await HotelDetails.findById(req.params.id);

    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return RoomDetails.findById(room);
      })
    );

    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};