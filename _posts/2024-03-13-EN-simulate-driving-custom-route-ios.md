---
layout: post
lang: EN
title: "How to simulate driving on custom routes in iOS"
date: 2024-03-13
tags: [Simulator, Xcode, Location]
---

Testing location based features in iOS apps shouldn't require burning gas 🔥 :P

---

You probably know that Xcode ships with preset routes like *Freeway Drive* (Features → Location → Freeway Drive), but you'll eventually need custom paths that match your app's real-world scenarios. In this article I'll give you a way to build them.

Those menu options — *City Run*, *Bicycle Ride*, *Freeway Drive* — are just GPX files. You can create your own and control every turn, speed change, and traffic signs pause.

GPX is plain XML. You can drop a file into your project, attach it to your scheme, and Xcode plays it back on command. No need for CoreLocation hacks or no third-party frameworks.

```xml
<?xml version="1.0"?>
<gpx version="1.1">
  <wpt lat="38.82600" lon="-9.16830">
    <speed>5.56</speed> <!-- 20 km/h -->
  </wpt>
  <wpt lat="38.82608" lon="-9.16790">
    <speed>6.94</speed> <!-- 25 km/h -->
  </wpt>
</gpx>
```

Something I learned the hard way is that if your GPX contains `<trk>` or `<trkseg>` tags, Xcode ignores them. It seems that Xcode only reads waypoints (`<wpt>`).

You can create your route in OpenMaps or Google Maps and share them with services that will convert your route to a GPX file. This is nice to get you a baseline and then improve it how you want or need.

You can also use some of these route generation tools:

- **[Open GPX Tracker](https://apps.apple.com/app/open-gpx-tracker/id984503772)** – Record real drives
- **[RideWithGPS](https://ridewithgps.com)** – Draw on map, export, convert tracks to waypoints
- **[gips](https://github.com/appscape/gips)** – Ruby script that interpolates points at target speeds

For controlling speed, you have two methods.

### Method 1: Timestamps

```xml
<wpt lat="38.82600" lon="-9.16830">
  <time>2025-01-15T10:00:00Z</time>
</wpt>
<wpt lat="38.82608" lon="-9.16790">
  <time>2025-01-15T10:00:02Z</time> <!-- 2 seconds later -->
</wpt>
```

Xcode waits exactly the time difference between points. Simple math, predictable results.

### Method 2: Speed tags

```xml
<wpt lat="38.82600" lon="-9.16830">
  <speed>8.33</speed> <!-- meters per second = 30 km/h -->
</wpt>
```

The simulator maintains this speed until the next waypoint changes it. Better for gradual accelerations.

> **Note:** If both exist, timestamps win. Also, `CLLocation.speed` always returns -1 in the simulator.

## Building realistic routes

### Point density matters
- **Straight roads:** 5–10 meter spacing
- **Curves:** 1–2 meter spacing
- **Sharp turns:** <1 meter spacing

Too few points = teleporting. Too many = wasted memory.

### Speed profiles

| Scenario | Speed adjustment |
|----------|-----------------|
| Highway merge | 60 → 80 → 100 km/h over 200m |
| City intersection | 50 → 20 → 0 → 30 km/h |
| Parking lot | Constant 10 km/h |
| Mountain switchback | 40 km/h straights, 20 km/h turns |

### Traffic simulation

Duplicate a waypoint with a later timestamp to pause:

```xml
<!-- Stop at red light -->
<wpt lat="38.82620" lon="-9.16710">
  <time>2025-01-15T10:00:10Z</time>
</wpt>
<wpt lat="38.82620" lon="-9.16710">
  <time>2025-01-15T10:00:13Z</time> <!-- 3-second pause -->
</wpt>
```

## Complete example: city delivery route

```xml
<?xml version="1.0"?>
<gpx version="1.1" creator="DeliveryApp">
  <!-- Start: warehouse exit at 20 km/h -->
  <wpt lat="38.82600" lon="-9.16830"><speed>5.56</speed></wpt>
  <wpt lat="38.82605" lon="-9.16820"><speed>5.56</speed></wpt>
  
  <!-- Accelerate to city speed -->
  <wpt lat="38.82615" lon="-9.16800"><speed>8.33</speed></wpt>
  <wpt lat="38.82625" lon="-9.16770"><speed>11.11</speed></wpt> <!-- 40 km/h -->
  
  <!-- Slow for residential area -->
  <wpt lat="38.82635" lon="-9.16740"><speed>6.94</speed></wpt>
  
  <!-- Stop for delivery (duplicate point) -->
  <wpt lat="38.82640" lon="-9.16720">
    <time>2025-01-15T10:00:30Z</time>
  </wpt>
  <wpt lat="38.82640" lon="-9.16720">
    <time>2025-01-15T10:00:45Z</time> <!-- 15-second stop -->
  </wpt>
  
  <!-- Resume route -->
  <wpt lat="38.82645" lon="-9.16700"><speed>5.56</speed></wpt>
</gpx>
```

## Integration steps

1. **Add to scheme:** Product → Scheme → Edit Scheme → Run → Options → Default Location → Add GPS Exchange to Workspace...
2. Run the app in Debug mode and the iOS Simulator automatically starts the route simulation.

## Troubleshooting

- If nothing happens, probably the GPX file is having some format error. Ensure it's added to your target. Validate the XML.
- If the location is jumpy, then add more waypoints in curves.
- Too fast/slow: you're missing speed or time tags—defaults to 1 point/second.

## Conclusion

Custom GPX routes will let you test edge cases or even run UI tests. Build once, test forever. Your QA team will thank you.

RP