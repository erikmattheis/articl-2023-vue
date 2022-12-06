<template>
  <article>
    <h1 v-if="!success">
      Articl.net User: {{ nameFirst }} {{ nameLast }}
    </h1>
    <h1 v-else>
      Account Updated
    </h1>
    <form>
      <template v-if="!isLoading">
        <fieldset class="grid">
          <div>
            <label for="nameFirst">First Name
              <input
                id="nameFirst"
                v-model="nameFirst"
                type="text"
                name="nameFirst"
                autocomplete="given-name"
              ></label>
          </div>
          <div>
            <label for="nameLast">Last Name
              <input
                id="nameLast"
                v-model="nameLast"
                type="text"
                name="nameLast"
                autocomplete="family-name"
              ></label>
          </div>
        </fieldset>
        <label for="email">Email
          <input
            id="email"
            v-model="email"
            type="text"
            name="email"
            autocomplete="email"
          ></label>
        <label for="position">Current position {{ position }}
          <select
            id="position"
            v-model="position"
            name="position"
          >
            <option
              disabled
              value=""
            >Please select one</option>
            <option value="Student">Student</option>
            <option value="Resident">Resident</option>
            <option value="Physician">Physician</option>
            <option value="Allied Healthcare Profession">Allied Healthcare Profession</option>
          </select>
        </label>
        <label for="institution">Institution
          <input
            id="institution"
            v-model="institution"
            type="text"
            name="institution"
            autocomplete="organization"
          ></label>
        <label for="city">City
          <input
            id="city"
            v-model="city"
            type="text"
            name="city"
          ></label>
        <label for="state">State/Provence
          <input
            id="state"
            v-model="state"
            type="text"
            name="state"
          ></label>
        <label for="country">Country
          <select
            id="country"
            v-model="country"
            name="country"
          >
            <option
              disabled
              value=""
            >Please select one</option>
            <option value="US">
              United States
            </option>
            <option value="AF">
              Afghanistan
            </option>
            <option value="AX">
              Åland Islands
            </option>
            <option value="AL">
              Albania
            </option>
            <option value="DZ">
              Algeria
            </option>
            <option value="AS">
              American Samoa
            </option>
            <option value="AD">
              Andorra
            </option>
            <option value="AO">
              Angola
            </option>
            <option value="AI">
              Anguilla
            </option>
            <option value="AQ">
              Antarctica
            </option>
            <option value="AG">
              Antigua and Barbuda
            </option>
            <option value="AR">
              Argentina
            </option>
            <option value="AM">
              Armenia
            </option>
            <option value="AW">
              Aruba
            </option>
            <option value="AU">
              Australia
            </option>
            <option value="AT">
              Austria
            </option>
            <option value="AZ">
              Azerbaijan
            </option>
            <option value="BS">
              Bahamas (the)
            </option>
            <option value="BH">
              Bahrain
            </option>
            <option value="BD">
              Bangladesh
            </option>
            <option value="BB">
              Barbados
            </option>
            <option value="BY">
              Belarus
            </option>
            <option value="BE">
              Belgium
            </option>
            <option value="BZ">
              Belize
            </option>
            <option value="BJ">
              Benin
            </option>
            <option value="BM">
              Bermuda
            </option>
            <option value="BT">
              Bhutan
            </option>
            <option value="BO">
              Bolivia (Plurinational State of)
            </option>
            <option value="BQ">
              Bonaire, Sint Eustatius and Saba
            </option>
            <option value="BA">
              Bosnia and Herzegovina
            </option>
            <option value="BW">
              Botswana
            </option>
            <option value="BV">
              Bouvet Island
            </option>
            <option value="BR">
              Brazil
            </option>
            <option value="IO">
              British Indian Ocean Territory (the)
            </option>
            <option value="BN">
              Brunei Darussalam
            </option>
            <option value="BG">
              Bulgaria
            </option>
            <option value="BF">
              Burkina Faso
            </option>
            <option value="BI">
              Burundi
            </option>
            <option value="CV">
              Cabo Verde
            </option>
            <option value="KH">
              Cambodia
            </option>
            <option value="CM">
              Cameroon
            </option>
            <option value="CA">
              Canada
            </option>
            <option value="KY">
              Cayman Islands (the)
            </option>
            <option value="CF">
              Central African Republic (the)
            </option>
            <option value="TD">
              Chad
            </option>
            <option value="CL">
              Chile
            </option>
            <option value="CN">
              China
            </option>
            <option value="CX">
              Christmas Island
            </option>
            <option value="CC">
              Cocos (Keeling) Islands (the)
            </option>
            <option value="CO">
              Colombia
            </option>
            <option value="KM">
              Comoros (the)
            </option>
            <option value="CD">
              Congo (the Democratic Republic of the)
            </option>
            <option value="CG">
              Congo (the)
            </option>
            <option value="CK">
              Cook Islands (the)
            </option>
            <option value="CR">
              Costa Rica
            </option>
            <option value="HR">
              Croatia
            </option>
            <option value="CU">
              Cuba
            </option>
            <option value="CW">
              Curaçao
            </option>
            <option value="CY">
              Cyprus
            </option>
            <option value="CZ">
              Czechia
            </option>
            <option value="CI">
              Côte d'Ivoire
            </option>
            <option value="DK">
              Denmark
            </option>
            <option value="DJ">
              Djibouti
            </option>
            <option value="DM">
              Dominica
            </option>
            <option value="DO">
              Dominican Republic (the)
            </option>
            <option value="EC">
              Ecuador
            </option>
            <option value="EG">
              Egypt
            </option>
            <option value="SV">
              El Salvador
            </option>
            <option value="GQ">
              Equatorial Guinea
            </option>
            <option value="ER">
              Eritrea
            </option>
            <option value="EE">
              Estonia
            </option>
            <option value="SZ">
              Eswatini
            </option>
            <option value="ET">
              Ethiopia
            </option>
            <option value="FK">
              Falkland Islands (the) [Malvinas]
            </option>
            <option value="FO">
              Faroe Islands (the)
            </option>
            <option value="FJ">
              Fiji
            </option>
            <option value="FI">
              Finland
            </option>
            <option value="FR">
              France
            </option>
            <option value="GF">
              French Guiana
            </option>
            <option value="PF">
              French Polynesia
            </option>
            <option value="TF">
              French Southern Territories (the)
            </option>
            <option value="GA">
              Gabon
            </option>
            <option value="GM">
              Gambia (the)
            </option>
            <option value="GE">
              Georgia
            </option>
            <option value="DE">
              Germany
            </option>
            <option value="GH">
              Ghana
            </option>
            <option value="GI">
              Gibraltar
            </option>
            <option value="GR">
              Greece
            </option>
            <option value="GL">
              Greenland
            </option>
            <option value="GD">
              Grenada
            </option>
            <option value="GP">
              Guadeloupe
            </option>
            <option value="GU">
              Guam
            </option>
            <option value="GT">
              Guatemala
            </option>
            <option value="GG">
              Guernsey
            </option>
            <option value="GN">
              Guinea
            </option>
            <option value="GW">
              Guinea-Bissau
            </option>
            <option value="GY">
              Guyana
            </option>
            <option value="HT">
              Haiti
            </option>
            <option value="HM">
              Heard Island and McDonald Islands
            </option>
            <option value="VA">
              Holy See (the)
            </option>
            <option value="HN">
              Honduras
            </option>
            <option value="HK">
              Hong Kong
            </option>
            <option value="HU">
              Hungary
            </option>
            <option value="IS">
              Iceland
            </option>
            <option value="IN">
              India
            </option>
            <option value="ID">
              Indonesia
            </option>
            <option value="IR">
              Iran (Islamic Republic of)
            </option>
            <option value="IQ">
              Iraq
            </option>
            <option value="IE">
              Ireland
            </option>
            <option value="IM">
              Isle of Man
            </option>
            <option value="IL">
              Israel
            </option>
            <option value="IT">
              Italy
            </option>
            <option value="JM">
              Jamaica
            </option>
            <option value="JP">
              Japan
            </option>
            <option value="JE">
              Jersey
            </option>
            <option value="JO">
              Jordan
            </option>
            <option value="KZ">
              Kazakhstan
            </option>
            <option value="KE">
              Kenya
            </option>
            <option value="KI">
              Kiribati
            </option>
            <option value="KP">
              Korea (the Democratic People's Republic of)
            </option>
            <option value="KR">
              Korea (the Republic of)
            </option>
            <option value="KW">
              Kuwait
            </option>
            <option value="KG">
              Kyrgyzstan
            </option>
            <option value="LA">
              Lao People's Democratic Republic (the)
            </option>
            <option value="LV">
              Latvia
            </option>
            <option value="LB">
              Lebanon
            </option>
            <option value="LS">
              Lesotho
            </option>
            <option value="LR">
              Liberia
            </option>
            <option value="LY">
              Libya
            </option>
            <option value="LI">
              Liechtenstein
            </option>
            <option value="LT">
              Lithuania
            </option>
            <option value="LU">
              Luxembourg
            </option>
            <option value="MO">
              Macao
            </option>
            <option value="MG">
              Madagascar
            </option>
            <option value="MW">
              Malawi
            </option>
            <option value="MY">
              Malaysia
            </option>
            <option value="MV">
              Maldives
            </option>
            <option value="ML">
              Mali
            </option>
            <option value="MT">
              Malta
            </option>
            <option value="MH">
              Marshall Islands (the)
            </option>
            <option value="MQ">
              Martinique
            </option>
            <option value="MR">
              Mauritania
            </option>
            <option value="MU">
              Mauritius
            </option>
            <option value="YT">
              Mayotte
            </option>
            <option value="MX">
              Mexico
            </option>
            <option value="FM">
              Micronesia (Federated States of)
            </option>
            <option value="MD">
              Moldova (the Republic of)
            </option>
            <option value="MC">
              Monaco
            </option>
            <option value="MN">
              Mongolia
            </option>
            <option value="ME">
              Montenegro
            </option>
            <option value="MS">
              Montserrat
            </option>
            <option value="MA">
              Morocco
            </option>
            <option value="MZ">
              Mozambique
            </option>
            <option value="MM">
              Myanmar
            </option>
            <option value="NA">
              Namibia
            </option>
            <option value="NR">
              Nauru
            </option>
            <option value="NP">
              Nepal
            </option>
            <option value="NL">
              Netherlands (the)
            </option>
            <option value="NC">
              New Caledonia
            </option>
            <option value="NZ">
              New Zealand
            </option>
            <option value="NI">
              Nicaragua
            </option>
            <option value="NE">
              Niger (the)
            </option>
            <option value="NG">
              Nigeria
            </option>
            <option value="NU">
              Niue
            </option>
            <option value="NF">
              Norfolk Island
            </option>
            <option value="MP">
              Northern Mariana Islands (the)
            </option>
            <option value="NO">
              Norway
            </option>
            <option value="OM">
              Oman
            </option>
            <option value="PK">
              Pakistan
            </option>
            <option value="PW">
              Palau
            </option>
            <option value="PS">
              Palestine, State of
            </option>
            <option value="PA">
              Panama
            </option>
            <option value="PG">
              Papua New Guinea
            </option>
            <option value="PY">
              Paraguay
            </option>
            <option value="PE">
              Peru
            </option>
            <option value="PH">
              Philippines (the)
            </option>
            <option value="PN">
              Pitcairn
            </option>
            <option value="PL">
              Poland
            </option>
            <option value="PT">
              Portugal
            </option>
            <option value="PR">
              Puerto Rico
            </option>
            <option value="QA">
              Qatar
            </option>
            <option value="MK">
              Republic of North Macedonia
            </option>
            <option value="RO">
              Romania
            </option>
            <option value="RU">
              Russian Federation (the)
            </option>
            <option value="RW">
              Rwanda
            </option>
            <option value="RE">
              Réunion
            </option>
            <option value="BL">
              Saint Barthélemy
            </option>
            <option value="SH">
              Saint Helena, Ascension and Tristan da Cunha
            </option>
            <option value="KN">
              Saint Kitts and Nevis
            </option>
            <option value="LC">
              Saint Lucia
            </option>
            <option value="MF">
              Saint Martin (French part)
            </option>
            <option value="PM">
              Saint Pierre and Miquelon
            </option>
            <option value="VC">
              Saint Vincent and the Grenadines
            </option>
            <option value="WS">
              Samoa
            </option>
            <option value="SM">
              San Marino
            </option>
            <option value="ST">
              Sao Tome and Principe
            </option>
            <option value="SA">
              Saudi Arabia
            </option>
            <option value="SN">
              Senegal
            </option>
            <option value="RS">
              Serbia
            </option>
            <option value="SC">
              Seychelles
            </option>
            <option value="SL">
              Sierra Leone
            </option>
            <option value="SG">
              Singapore
            </option>
            <option value="SX">
              Sint Maarten (Dutch part)
            </option>
            <option value="SK">
              Slovakia
            </option>
            <option value="SI">
              Slovenia
            </option>
            <option value="SB">
              Solomon Islands
            </option>
            <option value="SO">
              Somalia
            </option>
            <option value="ZA">
              South Africa
            </option>
            <option value="GS">
              South Georgia and the South Sandwich Islands
            </option>
            <option value="SS">
              South Sudan
            </option>
            <option value="ES">
              Spain
            </option>
            <option value="LK">
              Sri Lanka
            </option>
            <option value="SD">
              Sudan (the)
            </option>
            <option value="SR">
              Suriname
            </option>
            <option value="SJ">
              Svalbard and Jan Mayen
            </option>
            <option value="SE">
              Sweden
            </option>
            <option value="CH">
              Switzerland
            </option>
            <option value="SY">
              Syrian Arab Republic
            </option>
            <option value="TW">
              Taiwan (Province of China)
            </option>
            <option value="TJ">
              Tajikistan
            </option>
            <option value="TZ">
              Tanzania, United Republic of
            </option>
            <option value="TH">
              Thailand
            </option>
            <option value="TL">
              Timor-Leste
            </option>
            <option value="TG">
              Togo
            </option>
            <option value="TK">
              Tokelau
            </option>
            <option value="TO">
              Tonga
            </option>
            <option value="TT">
              Trinidad and Tobago
            </option>
            <option value="TN">
              Tunisia
            </option>
            <option value="TR">
              Turkey
            </option>
            <option value="TM">
              Turkmenistan
            </option>
            <option value="TC">
              Turks and Caicos Islands (the)
            </option>
            <option value="TV">
              Tuvalu
            </option>
            <option value="UG">
              Uganda
            </option>
            <option value="UA">
              Ukraine
            </option>
            <option value="AE">
              United Arab Emirates (the)
            </option>
            <option value="GB">
              United Kingdom of Great Britain and Northern Ireland (the)
            </option>
            <option value="UM">
              United States Minor Outlying Islands (the)
            </option>
            <option value="US">
              United States
            </option>
            <option value="UY">
              Uruguay
            </option>
            <option value="UZ">
              Uzbekistan
            </option>
            <option value="VU">
              Vanuatu
            </option>
            <option value="VE">
              Venezuela (Bolivarian Republic of)
            </option>
            <option value="VN">
              Viet Nam
            </option>
            <option value="VG">
              Virgin Islands (British)
            </option>
            <option value="VI">
              Virgin Islands (U.S.)
            </option>
            <option value="WF">
              Wallis and Futuna
            </option>
            <option value="EH">
              Western Sahara
            </option>
            <option value="YE">
              Yemen
            </option>
            <option value="ZM">
              Zambia
            </option>
            <option value="ZW">
              Zimbabwe
            </option>
          </select>
        </label>
        <input
          id="username"
          v-model="username"
          type="hidden"
          name="username"
        >
        <button
          id="Update"
          type="submit"
          :aria-busy="buttonDisabled"
          @click.prevent="submitForm()"
        >
          <span v-if="!buttonDisabled">Update Account</span>
        </button>
        <router-link to="/reset-password">
          Reset pass
        </router-link>
        <router-link
          to="/logout"
          class="right"
        >
          Log out
        </router-link>
      </template>
      <transition
        name="fade"
        mode="out-in"
      >
        <loading-placeholder v-if="isLoading" />
      </transition>
    </form>
  </article>
</template>

<script>
import LoadingPlaceholder from "@/components/ui/LoadingPlaceholder.vue";
import { setTitleAndDescription } from "@/services/htmlMetaService";
import { validateEmail } from "@/services/userService";

export default {
  name: "UsersPage",
  components: {
    LoadingPlaceholder,
  },
  data: () => {

    return {
      nameFirst: "",
      nameLast: "",
      formAction: "Create",
      email: null,
      position:"",
      city: "",
      state: "",
      country: "",
      institution: null,
      buttonDisabled: false,
      isLoading: true,
      errorMessage: "",
      success: false,
      result: null,
    };

  },
  mounted() {

    this.fetchData();

    this.formAction = this.id ? "Edit" : "Create";

    setTitleAndDescription({
      title: this.formAction,
    });

  },
  methods: {
    async fetchData() {

      try {

        this.isLoading = true;

        const result = await this.getMe();

        this.nameFirst = result.nameFirst ? result.nameFirst : "";

        this.nameLast = result.nameLast ? result.nameLast : "";

        this.email = result.email ? result.email : "";

        this.position = result.position ? result.position : "";

        this.institution = result.institution ? result.institution : "";

        this.city = result.city ? result.city : "";

        this.state = result.state ? result.state : "";

        this.country = result.country ? result.country : "";

        this.theme = result.theme !== "dark" ? "light" : "dark";

        this.fontSize = result.fontSize ? result.fontSize : "";

      } catch (error) {

        this.$store.dispatch("errors/setError", error);

      } finally {

        this.isLoading = false;

      }

    },

    async getMe() {

      const result = await this.$http({
        method: "GET",
        url: "/users/me",
      });

      return result.data;

    },
    resetFormErrors() {

      this.success = null;

      this.result = null;

      this.errorMessage = "";

    },
    checkForm() {

      this.resetFormErrors();

      let passed = true;

      if (!this.validateEmail(this.email)) {

        this.errorMessage = "Please enter a valid email.";

        passed = false;

      }

      return passed;

    },

    async submitForm() {

      try {

        this.resetFormErrors();

        if (this.checkForm() === true) {

          this.buttonDisabled = true;

          const result = await this.$http({
            method: "PATCH",
            url: "/users/me",
            data: {
              nameFirst: this.nameFirst,
              nameLast: this.nameLast,
              email: this.email,
              position: this.position,
              institution: this.institution,
              city: this.city,
              state: this.state,
              country: this.country,
            },
          });

          if (result.data) {

            this.success = true;

            this.result = result.data;

            this.$store.dispatch("modals/setSuccessTitle", "User Updated");

            this.$store.dispatch(
              "modals/setSuccessMessage",
              "Your account information was successfully updated.",
            );

          }

        } else {

          this.$store.dispatch(
            "errors/setError",
            this.errorMessage,
          );

        }

      } catch (error) {

        this.$store.dispatch("errors/setError", error);

      } finally {

        this.buttonDisabled = false;

      }

    },
    validateEmail,
  },
};
</script>

<style scoped>
nav ul {
  display: block;
}
</style>
