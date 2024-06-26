package io.ssafy.soupapi.global.util;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.Date;

public class DateConverterUtil {

    private static final String DATE_FORMAT = "yyyyMMdd HH:mm:ss.SSSSSS";
    private static final String LDT_FORMAT = "yyyy-MM-dd'T'HH:mm:ss.SSS";

    public static LocalDateTime StringToLdt(String ldt) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(LDT_FORMAT);
        return LocalDateTime.parse(ldt, formatter);
    }

    public static String ldtToString(LocalDateTime ldt) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(DATE_FORMAT);
        return ldt.format(formatter);
    }

    public static LocalDateTime ldtChangeTz(LocalDateTime ldt, String fromTz, String toTz) {
        ZonedDateTime fromZdt = ldt.atZone(ZoneId.of(fromTz));
        ZonedDateTime toZdt = fromZdt.withZoneSameInstant(ZoneId.of(toTz));
        return toZdt.toLocalDateTime();
    }

    public static Date ldtToDate(LocalDateTime ldt, String tz) {
        return Date.from(ldt.atZone(ZoneId.of(tz)).toInstant());
    }

    public static Long ldtToLong(LocalDateTime ldt) {
        return ldt.atZone(ZoneId.of("Asia/Seoul")).toInstant().toEpochMilli();
    }

    // KST LocalDateTime -> UTC Instant 로 변환 (이걸 DB에 저장)
    public static Instant kstLdtToInstant(LocalDateTime ldt) {
        ZonedDateTime zdt = ldt.atZone(ZoneId.of("Asia/Seoul"));
        return zdt.toInstant();
    }

    public static LocalDate instantToKstLd(Instant instant) {
        ZonedDateTime zdt = instant.atZone(ZoneId.of("Asia/Seoul"));
        return zdt.toLocalDate();
    }

    public static ZonedDateTime instantToKstZdt(Instant instant) {
        return instant.atZone(ZoneId.of("Asia/Seoul"));
    }

    public static Instant utcStringToInstant(String dateString) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        ZonedDateTime zonedDateTime = ZonedDateTime.parse(dateString, formatter.withZone(ZoneOffset.UTC));
        return zonedDateTime.toInstant();
    }

    public static ZonedDateTime utcZdtToKstZdt(ZonedDateTime utc) {
        return utc.withZoneSameInstant(ZoneId.of("Asia/Seoul"));
    }

    public static Instant ldToInstant(LocalDate ld) {
        LocalDateTime ldt = ld.atStartOfDay();
        ZonedDateTime zdt = ldt.atZone(ZoneId.systemDefault());
        return zdt.toInstant();
    }

}
