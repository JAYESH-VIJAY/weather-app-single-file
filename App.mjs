import axios from "axios";
import yargs from "yargs";
import chalk from "chalk";
import { hideBin } from "yargs/helpers";

const city_name = function (city) {
  const options = {
    method: "GET",
    url: "http://api.weatherapi.com/v1/current.json",
    params: { q: city },

    headers: {
      key: "45584f79e39a4ea4ac6203007230206",
    },
  };

  const getData = async function () {
    try {
      const response = await axios.request(options);
      console.log(
        chalk.white.inverse(
          `************weather of ${options.params.q} city************`
        )
      );
      // console.log(response.data);

      console.log(
        chalk.yellow(
          `last updated date and time: ${response.data.current.last_updated} \nwheather condition: ${response.data.current.condition.text} \ncurrent temperature: ${response.data.current.temp_c} degree celcius`
        )
      );
    } catch (error) {
      throw error;
    }
  };
  getData();
};

// for taking city from the user
yargs(hideBin(process.argv))
  .command({
    command: "city",
    describe: "for taking city",
    builder: {
      city_name: {
        describe: "city name",
        demandOption: true,
        type: "String",
      },
    },
    handler: (argv) => {
      city_name(argv.city_name);
    },
  })
  .parse();

//how to run this code
// open terminal and run
// node App.mjs city --city_name=''
// for example:
// node App.mjs city --city_name='delhi'
