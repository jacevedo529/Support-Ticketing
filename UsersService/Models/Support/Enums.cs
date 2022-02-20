using System.Text.Json.Serialization;

namespace Services.Models.Support
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum Status
    {
        New,
        Open,
        Closed
    }
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum Priority
    {
        Low,
        Medium,
        High
    }
}
