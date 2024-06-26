package io.ssafy.soupapi.domain.noti.dao;

import io.ssafy.soupapi.domain.noti.entity.MNoti;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.Update;

import java.time.Instant;
import java.util.List;

public interface NotiRepository extends MongoRepository<MNoti, ObjectId> {

    List<MNoti> findByReceiverIdAndIsReadOrderByCreatedAtDesc(String receiverId, boolean isRead);

    List<MNoti> findByReceiverIdAndCreatedAtBeforeOrderByCreatedAtDesc(String receiverId, Instant createdAt);

    List<MNoti> findByReceiverIdAndCreatedAtAfterOrderByCreatedAtAsc(String receiverId, Instant createdAt);

    @Query("{ '_id': ?0 }")
    @Update("{ $set: { noti_is_read:  ?1} }")
    void updateIsReadById(ObjectId notiId, boolean isRead);

}
