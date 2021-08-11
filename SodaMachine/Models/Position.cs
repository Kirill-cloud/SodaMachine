using Newtonsoft.Json;

namespace SodaMachine.Models
{
    public class Position
    {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("picture")]
        public string Picture { get; set; }

        [JsonProperty("price")]
        public int Price { get; set; }

        [JsonProperty("count")]
        public int Count { get; set; }
    }
}