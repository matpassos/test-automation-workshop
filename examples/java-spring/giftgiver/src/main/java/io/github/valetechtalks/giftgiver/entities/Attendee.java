package io.github.valetechtalks.giftgiver.entities;

public class Attendee {
    private final int id;
    private final String vendorUserId;
    private final String name;
    private final String rsvpAnswer;
    private final boolean awarded;

    public Attendee(int id, String vendorUserId, String name, String rsvpAnswer, boolean awarded) {
        this.id = id;
        this.vendorUserId = vendorUserId;
        this.name = name;
        this.rsvpAnswer = rsvpAnswer;
        this.awarded = false;
    }

    public int getId() {
        return id;
    }

    public String getVendorUserId() {
        return vendorUserId;
    }

    public String getName() {
        return name;
    }

    public String getRsvpAnswer() {
        return rsvpAnswer;
    }

    public boolean isAwarded() {
        return awarded;
    }
}