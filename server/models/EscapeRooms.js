const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const escapeRoomSchema = new Schema(  {
  name: String,
  email: String,
  phone: String,
  address: String,
  web_page: String,
  trip_advisor: String,
  facebook: String,
  location: { type: { type: String }, coordinates: [Number] },
  local_number: Number,
  google_map_link: String,
  post_code: String,
  instagram: String,
  rating: Number,
  opinion_count: Number,
  metro: {
      name: String,
      metros: [
          {
              color: String,
              active: Boolean
          }
      ]
  },
  city: {
      id: String,
      name: {
          en: String,
          es: String
      },
      province: {
          "id": String,
          name: {
              en: String,
              es: String
          }
      }
  },
  games: [
      {
          id: String,
          name: {
              en: String,
              es: String
          },
          minGamer: Number,
          maxGamer: Number,
          minPrice: String,
          maxPrice: String,
          themes: [
              {
                  id: String,
                  name: {
                      en: String,
                      es: String
                  }
              }
          ]
      },
  ],
  rank: Number
}, {
  timestamps: true
});

const EscapeRoom = mongoose.model('EscapeRoom', escapeRoomSchema);
module.exports = EscapeRoom;
